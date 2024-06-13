import { GET_APPLICATIONS } from "@/api/admin";
import { create } from "zustand";

export type ApplicationT = {
    full_name: string;
    edu_direction: string;
    education_form: string;
    from_date: string;
    status: 'pending' | 'accepted' | 'rejected';
    to_date: string;
    faculty: string;
    entered_year: number;
    graduation_year: number;
    edu_type: string;
    gender: 'male' | 'female';
    id: number;
}

interface useStoreState {
    isLoading: boolean;
    applications: ApplicationT[];
    getApplications: () => Promise<void | number>;
}

export const useAdminStore = create<useStoreState>((set, get) => ({
    isLoading: false,
    applications: [],
    getApplications: async () => {
        set({ isLoading: true })
        const response: any = await GET_APPLICATIONS()
        if(response?.success) {
            set({ applications: response.data.data, isLoading: false })
        } else {
            set({ isLoading: false })
        }
    }
}))