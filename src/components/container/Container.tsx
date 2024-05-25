'use client'
import { useIndexStore } from "@/store";
import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  const { isOpenBurger: isOpen } = useIndexStore()

  return (
    <div className={`max-w-[1560px] mx-auto xl:px-20 lg:px-6 md:px-10 sm:px-2 px-4 relative delay-300  ${isOpen ? '' : 'overflow-hidden'}`}>
      {children}
    </div>
  );
};

export default Container;
