import { ABOUT_ME } from '@/api/personal-info';
import { create } from 'zustand'

interface useSoreState {
  isLoading: boolean;
  aboutMe: (data:any) => Promise<any>;
}

export const personalInfoStore = create<useSoreState>((set) => ({
  isLoading: false,

  aboutMe: async (data:any) => {
    set({ isLoading: true });

    const result = await ABOUT_ME(data);    

    set({
      isLoading: false,
    });

    return result
  },
}))
