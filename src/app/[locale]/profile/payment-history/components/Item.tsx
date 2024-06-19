"use client";
import BaseIcon from "@/components/icons/BaseIcon";
import React, { useRef } from "react";
import { ItemType } from "../page";
import { formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useReactToPrint } from "react-to-print";

const Item = ({ item, index }: { item: ItemType; index: number }) => {
  const t = useTranslations("PaymentHistory");
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div
        className="py-[22px] bg-white rounded-lg flex justify-between mb-2"
        ref={componentRef}
      >
        <div className=" flex items-center">
          <p className="px-6 text-center text-[#24292F] text-sm font-medium">
            {index}
          </p>

          <p className="pl-10 pr-20 text-center text-[#24292F] text-sm font-medium">
            {t(`${item.type}`)}
          </p>

          <p className="pl-4 pr-14 text-center text-[#24292F] text-sm font-medium">
            {formatDate(item.created_at)}
          </p>

          <p className="pl-10 pr-14 text-center text-[#24292F] text-sm font-medium !whitespace-normal">
            {item.price}sum
          </p>

          <div className="pl-2 pr-10  flex items-center gap-2 ">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.status === "pending"
                  ? "bg-[#F39B33]"
                  : item.status === "accepted"
                  ? "bg-[#1CB854]"
                  : "bg-[#FF0000]"
              }`}
            ></div>
            <p className="text-center text-[#24292F] text-sm font-medium !whitespace-normal">
              {t(`${item.status}`)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center px-5">
          <div className="cursor-pointer" onClick={handlePrint}>
            <BaseIcon name="download" color="#1CB854" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
