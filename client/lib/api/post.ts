import axios from '../defaultClient';

export const loadAllPosts = (): Promise<any> => axios.get('/post');
export const requestNewPost = (): Promise<any> => axios.post('/post/new');