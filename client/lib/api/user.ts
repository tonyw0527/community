import axios from '../defaultClient';

export const loadMyInfo = (): Promise<any> => axios.get('/users');