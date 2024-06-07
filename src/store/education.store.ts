import { EDUCATION_INFO } from '@/api/education-info';
import { create } from 'zustand'

interface eduStoreState {
  isLoading: boolean;
  updateEduInfo: (data: any) => Promise<any>;
}

export const eduStore = create<eduStoreState>((set) => ({
  isLoading: false,

  updateEduInfo: async (data:any) => {
    set({ isLoading: true });

    const result = await EDUCATION_INFO(data);    

    set({
      isLoading: false,
    });

    return result
  },
}))
