import BaseIcon from "@/components/icons/BaseIcon";
import React from "react";
import { ItemType } from "../payments/page";

const PaymentItem = ({ date, amount, status, goal, id }: ItemType) => {
  return (
    <div className="py-[22px] bg-white rounded-lg flex justify-between mb-2">
      <div className=" flex items-center">
        <p className="w-[60px] text-center text-[#24292F] text-sm font-medium">
          {id}
        </p>

        <p className="w-[292px] pl-5 text-[#24292F] text-sm font-medium">
          {goal}
        </p>

        <p className="w-[292px] pl-5 text-[#24292F] text-sm font-medium">
          {date}
        </p>

        <p className="w-[292px] pl-5 text-[#24292F] text-sm font-medium !whitespace-normal">
          {amount}
        </p>

        <div className="w-[292px] pl-5  flex items-center gap-2 ">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              status.value === "pending"
                ? "bg-[#F39B33]"
                : status.value === "accepted"
                ? "bg-[#1CB854]"
                : "bg-[#FF0000]"
            }`}
          ></div>
          <p className="text-center text-[#24292F] text-sm font-medium !whitespace-normal">
            {status.label}
          </p>
        </div>
      </div>

      <div className="flex gap-3 items-center px-5">
        <div className="cursor-pointer">
          <BaseIcon name="download" color="#1CB854" />
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
