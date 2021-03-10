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

export const register = ({ email, password, nickname }: RegisterForm): Promise<any> => axios.post('/auth/register', { email, password, nickname });
export const login = ({ email, password, isAutoLogin }: LoginForm): Promise<any> => axios.post('/auth/login', { email, password, isAutoLogin });
export const loadMyInfo = (token: string|undefined): Promise<any> => axios.get('/auth/check', token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});
export const logout = (): Promise<any> => axios.get('/auth/logout');