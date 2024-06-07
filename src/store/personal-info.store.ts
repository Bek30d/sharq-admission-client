import { ABOUT_ME, GET_REGIONS, UPLOAD } from '@/api/personal-info';
import { create } from 'zustand'

interface useSoreState {
  isLoading: boolean;
  regions: any[];
  aboutMe: (data:any) => Promise<any>;
  fileUpload: (data:any) => Promise<any>;
  getRegions: () => Promise<any>;
}

export const personalInfoStore = create<useSoreState>((set) => ({
  isLoading: false,
  regions: [],
  aboutMe: async (data:any) => {
    set({ isLoading: true });

    const result = await ABOUT_ME(data);        

    set({
      isLoading: false,
    });

    return result
  },

  fileUpload: async (data: any) => {
    set({ isLoading: true });
    const result = await UPLOAD(data)

    set({
      isLoading: false,
    });

    return result
  },

  getRegions: async () => {
    const result = await GET_REGIONS()

    if(result.success){
    set({
      regions: result.data.regions
    })
    }
    
    

  }
}))
