import BaseIcon from "@/components/icons/BaseIcon";
import React from "react";
import { ItemType } from "../page";
import { formatDate } from "@/lib/utils";

const Item = ({ item, index }: { item: ItemType; index: number }) => {
  return (
    <div className="py-4 bg-white rounded-lg flex justify-between mb-2 shadow-sm">
      <div className="flex items-center flex-1 gap-9">
        <p className="w-12 text-center text-[#24292F] text-sm font-medium">
          {index + 1}
        </p>

        <p className="w-20 text-center text-[#24292F] text-sm font-medium">
          {item.apply_number}
        </p>

        <p className="w-40 text-center text-[#24292F] text-sm font-medium">
          {formatDate(item.created_at)}
        </p>

        <p className="w-32 text-center text-[#24292F] text-sm font-medium">
          {item.faculty ? item.faculty : "-"}
        </p>

        <div className="w-40 flex items-center justify-center gap-2">
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

      <div className="flex gap-3 items-center justify-end pr-5 w-24">
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

export default Item;
