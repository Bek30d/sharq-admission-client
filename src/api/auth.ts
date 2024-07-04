import axios from "@/lib/fetch"

export const POST_PHONE = (phone: string) => axios.post("/auth/send-code", {
    phone
})

export const LOGIN = (code: string, phone: string) => axios.post("/auth/login", {
    code,
    phone
})

export const POST_PASSPORT = (passport_number: string, birthday: string) => axios.post("/users/passport-verification", {
    passport_number,
    birthday
})