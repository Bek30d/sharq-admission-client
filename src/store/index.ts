import { create } from 'zustand'

interface useSoreState {
    isOpenBurger: boolean,
    setIsOpenBurger: (isOpen: boolean) => void,
    phone: string,
    setPhone: (phone: string) => void
}

export const useIndexStore = create<useSoreState>((set) => ({
  isOpenBurger: false,
  setIsOpenBurger: (isOpen: boolean) => set({ isOpenBurger: isOpen }),
  phone: '',
  setPhone: (phone: string) => set({ phone: phone }),
}))
