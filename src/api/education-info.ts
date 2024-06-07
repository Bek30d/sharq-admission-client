import axios from '@/lib/fetch';

export function EDUCATION_INFO(data: any) {
  return axios.post('/education/store', data)
}