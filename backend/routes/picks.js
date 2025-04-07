const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserPick = require('../models/userPick');

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Submit user picks
router.post(
  '/',
  verifyToken,
  [
    body('playerIds').isArray({ min: 12, max: 12 }).withMessage('Must select 12 players'),
    body('pickOrder').isArray({ min: 12, max: 12 }).withMessage('Must specify pick order for 12 players'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { playerIds, pickOrder } = req.body;

    try {
      const userPicks = await Promise.all(
        playerIds.map((playerId, index) =>
          UserPick.create({ user_id: req.userId, player_id: playerId, pick_order: pickOrder[index] })
        )
      );

      res.status(201).json({ message: 'Picks submitted successfully', picks: userPicks });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

// Retrieve user picks
router.get('/', verifyToken, async (req, res) => {
  try {
    const userPicks = await UserPick.findAll({ where: { user_id: req.userId } });

    res.status(200).json({ picks: userPicks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update user picks
router.put(
  '/:id',
  verifyToken,
  [
    body('playerIds').isArray({ min: 12, max: 12 }).withMessage('Must select 12 players'),
    body('pickOrder').isArray({ min: 12, max: 12 }).withMessage('Must specify pick order for 12 players'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { playerIds, pickOrder } = req.body;
    const { id } = req.params;

    try {
      const userPick = await UserPick.findByPk(id);
      if (!userPick || userPick.user_id !== req.userId) {
        return res.status(404).json({ message: 'Pick not found' });
      }

      await Promise.all(
        playerIds.map((playerId, index) =>
          userPick.update({ player_id: playerId, pick_order: pickOrder[index] })
        )
      );

      res.status(200).json({ message: 'Picks updated successfully', pick: userPick });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

// Delete user pick
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const userPick = await UserPick.findByPk(id);
    if (!userPick || userPick.user_id !== req.userId) {
      return res.status(404).json({ message: 'Pick not found' });
    }

    await userPick.destroy();

    res.status(200).json({ message: 'Pick deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
