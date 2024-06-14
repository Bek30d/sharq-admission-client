import { ABOUT_ME, CHOOSE_DIRECTION, EDUCATION_INFO, GET_REGIONS, UPLOAD } from '@/api/form'
import toast from 'react-hot-toast';
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
    let result = {}

    try {
      result = await ABOUT_ME(data);        

      if (!result.success) {
        toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }

    set({
      isLoading: false,
    });

    return result
  },

  fileUpload: async (data: any) => {
    let result = {}
    set({ isLoading: true });

    try {
      result = await UPLOAD(data)
      if (!result.success) {
        toast.error("File yuklashda xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }

    set({
      isLoading: false,
    });

    return result
  },

  getRegions: async () => {
    let result = {}
    
    try {
      result = await GET_REGIONS()
      if(result.success){
      set({
        regions: result.data.regions
      })
    } else {
      toast.error("Viloyatlarni olishda xatolik yuz berdi");
    }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
  },

  updateEduInfo: async (data:any) => {
    set({ isLoading: true });
    let result = {}

    try {
      result = await EDUCATION_INFO(data);    
      
      if (!result.success) {
        toast.error("Ma'lumotlarni yangilashda xatolik yuz berdi");
      }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }

    set({
      isLoading: false,
    });

    return result
  },

  chooseDirection: async (id: string, data: any) => {
    let result = {}
    set({ isLoading: true });

    try {
      result = await CHOOSE_DIRECTION(id, data);
      
      if (!result.success) {
        toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi")
      }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }

    set({
      isLoading: false,
    })

    return result
  }
}))
