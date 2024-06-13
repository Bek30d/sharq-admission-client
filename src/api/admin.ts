import axios from "@/lib/fetch";

export const GET_APPLICATIONS = () => axios.get('/applications')