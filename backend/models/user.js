const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.createUser = async function (username, email, password_hash) {
  return await User.create({ username, email, password_hash });
};

User.findUserByEmail = async function (email) {
  return await User.findOne({ where: { email } });
};

User.findUserById = async function (id) {
  return await User.findByPk(id);
};

User.updateUser = async function (id, updates) {
  return await User.update(updates, { where: { id } });
};

module.exports = User;
