import { GET_My_APPLICATIONS } from "@/api/user"
import { create } from "zustand"
import toast, { Toaster } from 'react-hot-toast';


interface UserStates {
  isLoading: boolean,
  myApplications: any[],
  getMyApplications: () => void
}


export const useUserStore = create<UserStates>((set, get) => ({
  isLoading: false,
  myApplications: [],
  getMyApplications: async () => {
    set({ isLoading: true })
    try {
      const result = await GET_My_APPLICATIONS()
      set({ myApplications: result.data.data })
    } catch (error) {
      toast.error('Xatolik yuz berdi')
    }
  }
}))