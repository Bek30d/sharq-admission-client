import { GET_APPLICATIONS, GET_APPLICATIONS_DETAILS } from "@/api/admin";
import { create } from "zustand";

export type ApplicationT = {
    full_name?: string;
    edu_direction?: string;
    education_form?: string;
    from_date?: string;
    status: 'pending' | 'accepted' | 'rejected';
    to_date?: string;
    faculty?: string;
    entered_year?: number;
    graduation_year?: number;
    edu_type?: string;
    gender?: 'male' | 'female';
    id?: number;
}

interface useStoreState {
    isLoading: boolean;
    applications: ApplicationT[];
    isShowSideBar: boolean;
    details: any | null;
    getApplications: (filter?: any) => void;
    setIsShowSideBar: (isOpen: boolean) => void;
    getApplicationsDetails: (id: number) => Promise<any | null>;
}

export const useAdminStore = create<useStoreState>((set, get) => ({
    isLoading: false,
    applications: [],
    isShowSideBar: false,
    details: null,
    getApplications: async (filter?: any) => {
        set({ isLoading: true })
        const response: any = await GET_APPLICATIONS(filter)
        if(response?.success) {
            set({ applications: response.data, isLoading: false })
        } else {
            set({ isLoading: false })
        }
    },
    setIsShowSideBar: (isOpen: boolean) => {
        set({ isShowSideBar: isOpen })
    },
    getApplicationsDetails: async (id: number) => {
        set({ isLoading: true })
        try{
            const response: any = await GET_APPLICATIONS_DETAILS(id)
            set({ isLoading: false, details: response.data.data })
        } catch(error) {
            set({ isLoading: false, details: null })
            console.log(error)
        }
    }
}))