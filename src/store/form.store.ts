import { ABOUT_ME, CHOOSE_DIRECTION, EDUCATION_INFO, GET_COUNTRIES, GET_REGIONS, UPLOAD } from '@/api/form'
import toast from 'react-hot-toast';
import { create } from 'zustand'

interface useSoreState {
  isLoading: boolean;
  regions: any[];
  countries: any[];
  aboutMe: (data:any) => Promise<any>;
  fileUpload: (data:any) => Promise<any>;
  getRegions: () => Promise<any>;
  updateEduInfo: (data: any) => Promise<any>;
  chooseDirection: (id: string, data: any) => Promise<any>;
  getCountries: () => Promise<any>;
}

export const formStore = create<useSoreState>((set) => ({
  isLoading: false,
  regions: [],
  countries: [],
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

  getCountries: async () => {
    let result = {}
    
    try {
      result = await GET_COUNTRIES()
      if(result.success){
      set({
        countries: result.data
      })
    } else {
      toast.error("Davlatlarni olishda xatolik yuz berdi");
    }
    } catch (error) {
      toast.error("Serverda xatolik yuz berdi");
    }
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
