import axios from '../defaultClient';

export interface Post {
  id?: number,
  title: string,
  markdown: string,
  writer: string,
}

export const loadAllPosts = (): Promise<any> => axios.get('/post');

export const loadOnePost = (id: string): Promise<any> => axios.get(`/post/${id}`);

export const loadMyPosts = (token: string): Promise<any> => axios.get('/post/manage/my', token ? {
  headers: {"Authorization": `Bearer ${token}`}
}: {});

export const requestNewPost = (token: string, { title, markdown, writer }: Post): Promise<any> => axios.post('/post/new', { title, markdown, writer }, token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});

export const requestUpdatePost = (token: string, { id, title, markdown, writer }: Post): Promise<any> => axios.put('/post/new', { id, title, markdown, writer }, token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});

export const requestDeletePost = (token: string, id: string ): Promise<any> => axios.delete(`/post/${id}`, token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});