import axios from "@/lib/fetch";

export const GET_APPLICATIONS = (filter?: any) => {
    return axios.get('/applications', {
        params: filter
    })
}

export const GET_APPLICATIONS_DETAILS = (id: number) => axios.get(`/about-application/${id}`);

export const GET_REPORTS = (filter?: any) => {
    return axios.get('/reports', {
        params: filter
    })
}