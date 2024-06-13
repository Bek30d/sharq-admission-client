import axios from '@/lib/fetch';

export const GET_My_APPLICATIONS = () => axios.get('/my-applications')