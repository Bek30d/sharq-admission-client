"use client";
import React from "react";
import icons from "../icons/icons";
import BaseIcon from "../icons/BaseIcon";

export type TabType = {
    title: string;
    description: string;
    icon: keyof typeof icons;
    path: string;
};

const PaymentTab = () => {
    return (
        <div className="p-4 bg-white w-full rounded-lg hidden justify-between items-center md:flex">
            <>
                <div className="flex gap-2 items-center">
                    <div className="bg-[#F5F8FF] rounded-full flex justify-center items-center w-14 h-14">
                        <BaseIcon
                            name="payment_time"
                            viewBox="0 0 24 28"
                            color="#0055FB"
                        />
                    </div>
                    <div>
                        <h2
                            className="text-xl font-semibold text-[#0055FB]"
                        >
                            To’ovni amalga oshirish
                        </h2>
                        <p className="hidden lg:block text-sm text-[#57606A]">
                            Belgilangan to’lov miqdori <span className="text-[#18324D] font-medium">115 000 uzs</span>
                        </p>
                    </div>
                </div>
            </>
        </div>
    );
};

export default PaymentTab;