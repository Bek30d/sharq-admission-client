import { useIndexStore } from "@/store";
import React, { useEffect } from "react";

const HamburgerButton = () => {
    const { isOpenBurger: isOpen, setIsOpenBurger } = useIndexStore()

    const handleCLick = () => {
        setIsOpenBurger(!isOpen);
    };

    useEffect(() => {
        document.body.style.overflowY = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <div className={`self-end z-20`}>
            <button
                className="flex h-12 w-12 flex-col items-center justify-center rounded duration-300 hover:opacity-80"
                onClick={handleCLick}
            >
                <div
                    className={`h-[2px] w-4 my-[2px] rounded-full transition ease transform duration-300 bg-white ${isOpen ? "translate-y-[6px] rotate-45" : ""
                        }`}
                ></div>
                <div
                    className={`h-[2px] w-4 my-[2px] rounded-full transition ease bg-white ${isOpen ? "opacity-0" : ""
                        }`}
                />
                <div
                    className={`h-[2px] w-4 my-[2px] rounded-full transition ease transform duration-300 bg-white ${isOpen ? "-translate-y-[6px] -rotate-45" : ""
                        }`}
                />
            </button>
        </div>
    );
};

export default HamburgerButton;
