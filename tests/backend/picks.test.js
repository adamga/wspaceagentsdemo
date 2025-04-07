const request = require('supertest');
const app = require('../../backend/server');
const User = require('../../backend/models/user');
const Player = require('../../backend/models/player');
const UserPick = require('../../backend/models/userPick');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Picks API', () => {
  let token;
  let userId;
  let playerIds;

  beforeAll(async () => {
    await User.sync({ force: true });
    await Player.sync({ force: true });
    await UserPick.sync({ force: true });

    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password_hash: await bcrypt.hash('password123', 10),
    });

    userId = user.id;

    const players = await Promise.all(
      Array.from({ length: 12 }).map((_, index) =>
        Player.create({
          name: `Player ${index + 1}`,
          country: 'Country',
          ranking: index + 1,
        })
      )
    );

    playerIds = players.map((player) => player.id);

    token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('POST /api/picks', () => {
    it('should submit user picks', async () => {
      const res = await request(app)
        .post('/api/picks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          playerIds,
          pickOrder: Array.from({ length: 12 }).map((_, index) => index + 1),
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Picks submitted successfully');
      expect(res.body.picks).toHaveLength(12);
    });

    it('should not submit picks with less than 12 players', async () => {
      const res = await request(app)
        .post('/api/picks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          playerIds: playerIds.slice(0, 11),
          pickOrder: Array.from({ length: 11 }).map((_, index) => index + 1),
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('GET /api/picks', () => {
    it('should retrieve user picks', async () => {
      const res = await request(app)
        .get('/api/picks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.picks).toHaveLength(12);
    });
  });

  describe('PUT /api/picks/:id', () => {
    it('should update user picks', async () => {
      const pickId = (await UserPick.findOne({ where: { user_id: userId } })).id;

      const res = await request(app)
        .put(`/api/picks/${pickId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          playerIds,
          pickOrder: Array.from({ length: 12 }).map((_, index) => 12 - index),
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Picks updated successfully');
    });

    it('should not update picks with less than 12 players', async () => {
      const pickId = (await UserPick.findOne({ where: { user_id: userId } })).id;

      const res = await request(app)
        .put(`/api/picks/${pickId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          playerIds: playerIds.slice(0, 11),
          pickOrder: Array.from({ length: 11 }).map((_, index) => 11 - index),
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/picks/:id', () => {
    it('should delete a user pick', async () => {
      const pickId = (await UserPick.findOne({ where: { user_id: userId } })).id;

      const res = await request(app)
        .delete(`/api/picks/${pickId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Pick deleted successfully');
    });

    it('should not delete a non-existent pick', async () => {
      const res = await request(app)
        .delete('/api/picks/9999')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Pick not found');
    });
  });
});
