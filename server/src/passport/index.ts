import local from './localStrategy';
import jwt from './jwtStrategy';

const passportConfig = () => {
  local();
  jwt();
}

export default passportConfig;