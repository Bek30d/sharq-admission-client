import { ABOUT_ME, CHOOSE_DIRECTION, EDUCATION_INFO, GET_REGIONS, UPLOAD } from '@/api/form'
import { create } from 'zustand'

interface useSoreState {
  isLoading: boolean;
  regions: any[];
  aboutMe: (data:any) => Promise<any>;
  fileUpload: (data:any) => Promise<any>;
  getRegions: () => Promise<any>;
  updateEduInfo: (data: any) => Promise<any>;
  chooseDirection: (id: string, data: any) => Promise<any>;
}

export const formStore = create<useSoreState>((set) => ({
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
  },

  updateEduInfo: async (data:any) => {
    set({ isLoading: true });

    const result = await EDUCATION_INFO(data);    

    set({
      isLoading: false,
    });

    return result
  },

  chooseDirection: async (id: string, data: any) => {
    set({ isLoading: true });
    const result = await CHOOSE_DIRECTION(id, data);
    set({
      isLoading: false,
    })

    return result
  }
}))
