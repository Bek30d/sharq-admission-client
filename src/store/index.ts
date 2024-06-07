import { create } from 'zustand'

interface useStoreState {
    isOpenBurger: boolean,
    setIsOpenBurger: (isOpen: boolean) => void,
    phone: string,
    setPhone: (phone: string) => void
}

export const useIndexStore = create<useStoreState>((set) => ({
  isOpenBurger: false,
  setIsOpenBurger: (isOpen: boolean) => set({ isOpenBurger: isOpen }),
  phone: '',
  setPhone: (phone: string) => set({ phone: phone }),
}))
