const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PasswordResetToken = sequelize.define('PasswordResetToken', {
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

PasswordResetToken.createToken = async function (user_id, token, expires_at) {
  return await PasswordResetToken.create({ user_id, token, expires_at });
};

PasswordResetToken.findToken = async function (token) {
  return await PasswordResetToken.findOne({ where: { token } });
};

PasswordResetToken.invalidateToken = async function (token) {
  return await PasswordResetToken.destroy({ where: { token } });
};

module.exports = PasswordResetToken;
