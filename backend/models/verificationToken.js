const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerificationToken = sequelize.define('VerificationToken', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

VerificationToken.createToken = async function (user_id, token, expires_at) {
  return await VerificationToken.create({ user_id, token, expires_at });
};

VerificationToken.findToken = async function (token) {
  return await VerificationToken.findOne({ where: { token } });
};

VerificationToken.invalidateToken = async function (token) {
  return await VerificationToken.destroy({ where: { token } });
};

module.exports = VerificationToken;
