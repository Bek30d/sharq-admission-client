import axios from '@/lib/fetch';

export function GET_USER() {
  return axios.get('/user');
}