import { LOGIN, POST_PASSPORT, POST_PHONE } from "@/api/auth";
import { create } from "zustand";
import {setCookie } from "nookies"

interface AuthState {
    isLoading: boolean;
    phone: string;
    setPhone: (phone: string) => void;
    postPhone: (phone: string) => Promise<void | number>;
    login: (code: string) => Promise<void | number>;
    postPassport: (passport_number: string, birthday: string) => Promise<void | number>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isLoading: false,
    phone: '+998',
    setPhone: (phone: string) => set({ phone: phone }),
    postPhone: async (phone: string) => {
        set({ isLoading: true })
        try {
            const res: any = await POST_PHONE(phone);
            if(res.success) {
                set({phone, isLoading: false})
                return 1
            }
        } catch (error) {
            console.log(error);
            set({isLoading: false})
        }
    },
    login: async (code: string) => {
        set({ isLoading: true })
        try {
            const res: any = await LOGIN(code, get().phone);
            if(res.success) {
                set({isLoading: false})
                localStorage.setItem('access_token', res?.data?.token)
                setCookie(null, 'access_token', res?.data?.token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
                return 1
            }
        } catch (error) {
            console.log(error);
        }
    },
    postPassport: async (passport_number: string, birthday: string) => {
        set({ isLoading: true })
        try {
            const res: any = await POST_PASSPORT(passport_number, birthday);
            if(res.success) {
                set({isLoading: false})
                return 1
            }
        } catch (error) {
            console.log(error);
        }
    }
}))