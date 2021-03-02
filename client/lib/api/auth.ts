import axios from '../defaultClient';

export interface LoginForm {
  email: string,
  password: string
}

export interface RegisterForm {
  email: string,
  password: string,
  nickname: string
}

export const localLogin = ({ email, password }: LoginForm): Promise<any> => axios.post('/auth/login', { email, password });
export const logout = (): Promise<any> => axios.get('/auth/logout');
export const localRegister = ({ email, password, nickname }: RegisterForm): Promise<any> => axios.post('/auth/register', { email, password, nickname });