import local from './localStrategy';
import * as JWT from './jwtStrategy';

const passportConfig = () => {
  local();
  JWT.jwtForAccess();
  JWT.jwtForRefresh();
}

export default passportConfig;