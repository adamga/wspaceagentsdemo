const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ranking: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Player.createPlayer = async function (name, country, ranking) {
  return await Player.create({ name, country, ranking });
};

Player.findPlayerById = async function (id) {
  return await Player.findByPk(id);
};

Player.updatePlayer = async function (id, updates) {
  return await Player.update(updates, { where: { id } });
};

module.exports = Player;
