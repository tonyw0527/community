import axios from '../defaultClient';

export interface LoginForm {
  email: string,
  password: string
}

export const login = ({ email, password }: LoginForm): Promise<any> => axios.post('/auth/login', { email, password });
export const logout = (): Promise<any> => axios.post('/auth/logout');
export const localRegister = (): Promise<any> => axios.post('/auth/register/local', {})