import { GET_BILLING_URL } from "@/api/payment";
import { create } from "zustand";

type PaymentState = {
    isLoading: boolean,
    getBillingUrl: (method: string, application_id: string) => Promise<any>
}


export const usePaymentStore = create<PaymentState>((set) => ({
    isLoading: false,
    getBillingUrl: async (method: string, application_id: string) => {
        set({ isLoading: true })
        try {
            const res: any = await GET_BILLING_URL(method, application_id)
            if (res.success) {
                set({ isLoading: false })
                return res.data.url as string
            }
        } catch (error) {
            console.log(error)
            set({ isLoading: false })
        }
    }
}))