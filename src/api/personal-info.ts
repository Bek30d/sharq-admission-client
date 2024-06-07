import axios from '@/lib/fetch';

export function ABOUT_ME(data: any) {
  return axios.put('/users/update', data)
}

export function UPLOAD(data:any){
  return axios.post('/media/upload', data)
}

export function GET_REGIONS() {
  return axios.get('/regions')
}