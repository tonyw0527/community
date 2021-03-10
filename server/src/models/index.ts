import user from './user';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

// model 추가
export const User = user(sequelize);