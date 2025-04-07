const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPick = sequelize.define('UserPick', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pick_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

UserPick.createUserPick = async function (user_id, player_id, pick_order) {
  return await UserPick.create({ user_id, player_id, pick_order });
};

UserPick.findUserPickById = async function (id) {
  return await UserPick.findByPk(id);
};

UserPick.updateUserPick = async function (id, updates) {
  return await UserPick.update(updates, { where: { id } });
};

module.exports = UserPick;
