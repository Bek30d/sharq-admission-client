import { GET_USER } from '@/api/main';
import { create } from 'zustand'

interface useSoreState {
  isLoading: boolean;
  user: any,
  getMyData: () => void
}

export const userStore = create<useSoreState>((set) => ({
  isLoading: false,
  user: {},

  getMyData: async () => {
    set({ isLoading: true });

    const lentRes: { success: boolean; data: any; } = await GET_USER();

    if(lentRes.success){
      set({
        user: lentRes.data
      })
    }    

    set({
      isLoading: false,
    });

    return lentRes
  },
}))
