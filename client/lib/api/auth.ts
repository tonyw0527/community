import axios from '../defaultClient';

export interface LoginForm {
  email: string,
  password: string,
  isAutoLogin: boolean;
}

export interface RegisterForm {
  email: string,
  password: string,
  nickname: string
}

export const login = ({ email, password, isAutoLogin }: LoginForm): Promise<any> => axios.post('/auth/login', { email, password, isAutoLogin });
export const loadMyInfo = (): Promise<any> => axios.get('/auth/user');
export const register = ({ email, password, nickname }: RegisterForm): Promise<any> => axios.post('/auth/register', { email, password, nickname });
export const logout = (): Promise<any> => axios.get('/auth/logout');