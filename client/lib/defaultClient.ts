import axios from 'axios';

const defaultClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : 'https://service-url',
  withCredentials: true, // send cookies to different domain
});

export default defaultClient;