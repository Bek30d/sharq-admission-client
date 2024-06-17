import BaseIcon from "@/components/icons/BaseIcon";
import React from "react";
import { ItemType } from "../page";

const MobileITem = ({ date, goal, status, amount, id }: ItemType) => {
  return (
    <div className="py-6 px-4 bg-white rounded-2xl mb-2">
      <div className="border-b border-[#EAEEF2] mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Maqsad:</p>
          <p className="text-[#24292F] text-sm font-medium">{goal}</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">To’lovlar sanasi:</p>
          <p className="text-[#24292F] text-sm font-medium">{date}</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Miqdor:</p>
          <p className="text-[#24292F] text-sm font-medium">{amount}</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">To’lov statusi:</p>
          <div className="w-52 flex items-center gap-2 ml-3 justify-end">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                status.value === "pending"
                  ? "bg-[#F39B33]"
                  : status.value === "accepted"
                  ? "bg-[#1CB854]"
                  : "bg-[#FF0000]"
              }`}
            ></div>
            <p className="text-center text-[#24292F] text-sm font-medium">
              {status.label}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="cursor-pointer">
          <BaseIcon name="download" color="#1CB854" />
        </div>
      </div>
    </div>
  );
};

export default MobileITem;
