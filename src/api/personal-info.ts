import axios from '@/lib/fetch';

export function ABOUT_ME(data: any) {
  return axios.post('/my-applications', data)
}