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


export function EDUCATION_INFO(data: any) {
  return axios.post('/education/store', data)
}

export function CHOOSE_DIRECTION(id, data){
  return axios.post(`/direction/store/${id}`, data)
}