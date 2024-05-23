import { create } from 'zustand'

interface useSoreState {
    isOpenBurger: boolean,
    setIsOpenBurger: (isOpen: boolean) => void,
}

export const useIndexStore = create<useSoreState>((set) => ({
  isOpenBurger: false,
  setIsOpenBurger: (isOpen: boolean) => set({ isOpenBurger: isOpen }),
}))
