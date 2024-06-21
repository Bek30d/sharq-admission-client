import axios from "@/lib/fetch";

export const GET_BILLING_URL = (method: string, application_id: string) =>axios.get("/get-billing-url", {
    params: {
        method, application_id
    }
})