import axios from 'axios';

const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000/api';
  return 'https://service-url';
})();

const defaultClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default defaultClient;