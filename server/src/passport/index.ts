import local from './localStrategy';
import jwt from './jwtStrategy';

module.exports = () => {
  local();
  jwt();
}