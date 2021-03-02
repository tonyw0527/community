const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// model 추가
db.User = require('./user')(sequelize, DataTypes);

module.exports = db;