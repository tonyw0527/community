import user from './user';
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

// model 추가
export const User = user(sequelize, DataTypes);