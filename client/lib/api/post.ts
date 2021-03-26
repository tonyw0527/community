import axios from '../defaultClient';

export interface Post {
  title: string,
  markdown: string,
  writer: string,
}

export const loadAllPosts = (token: string | undefined): Promise<any> => axios.get('/post', token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});

export const loadMyPosts = (token: string): Promise<any> => axios.get('/post/my', token ? {
  headers: {"Authorization": `Bearer ${token}`}
}: {});

export const requestNewPost = (token: string, { title, markdown, writer }: Post): Promise<any> => axios.post('/post/new', { title, markdown, writer }, token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});

// export const requestUpdatePost = (token: string | undefined, { title, markdown, writer }: Post): Promise<any> => axios.put('/post/new', { title, markdown, writer }, token ? {
//   headers: {"Authorization": `Bearer ${token}`}
// } : {});

export const requestDeletePost = (token: string, id: string ): Promise<any> => axios.delete(`/post/delete/${id}`, token ? {
  headers: {"Authorization": `Bearer ${token}`}
} : {});