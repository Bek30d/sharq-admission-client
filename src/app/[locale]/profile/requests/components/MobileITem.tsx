import BaseIcon from "@/components/icons/BaseIcon";
import React from "react";
import { ItemType } from "../page";
import { formatDate } from "@/lib/utils";

const MobileITem = ({ item }: { item: ItemType }) => {
  return (
    <div className="py-6 px-4 bg-white rounded-2xl mb-2">
      <div className="border-b border-[#EAEEF2] mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Ariza raqami:</p>
          <p className="text-[#24292F] text-sm font-medium">
            {item.apply_number}
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Berilgan sana:</p>
          <p className="text-[#24292F] text-sm font-medium">
            {formatDate(item.created_at)}
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Fakultet nomi:</p>
          <p className="text-[#24292F] text-sm font-medium">
            {item.faculty ? item.faculty : "-"}
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">Ariza statusi:</p>
          <div className="w-52 flex items-center gap-2 ml-3 justify-end">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.status === "pending"
                  ? "bg-[#F39B33]"
                  : item.status === "accepted"
                  ? "bg-[#1CB854]"
                  : "bg-[#FF0000]"
              }`}
            ></div>
            <p className="text-center text-[#24292F] text-sm font-medium">
              {item.status === "pending"
                ? "Ko'rib chiqilmoqda"
                : item.status === "accepted"
                ? "Qabul qilingan"
                : "Rad etildi"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="cursor-pointer">
          <BaseIcon name="download" color="#1CB854" />
        </div>
        <div className="cursor-pointer">
          <BaseIcon name="pencil" color="#0055FB" />
        </div>
      </div>
    </div>
  );
};

export default MobileITem;
