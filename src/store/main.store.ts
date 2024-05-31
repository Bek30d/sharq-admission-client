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

    const lentRes = await GET_USER();

    set({
      isLoading: false,
      user: lentRes as any,
    });
  },
}))
