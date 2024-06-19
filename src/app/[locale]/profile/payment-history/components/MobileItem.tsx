"use client";
import BaseIcon from "@/components/icons/BaseIcon";
import React, { useRef } from "react";
import { ItemType } from "../page";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";

const MobileITem = ({ item, index }: { item: ItemType; index: number }) => {
  const t = useTranslations("PaymentHistory");
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="py-6 px-4 bg-white rounded-2xl mb-2" ref={componentRef}>
      <div className="border-b border-[#EAEEF2] mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">{t("goal")}:</p>
          <p className="text-[#24292F] text-sm font-medium">
            {t(`${item.type}`)}
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">{t("date")}:</p>
          <p className="text-[#24292F] text-sm font-medium">
            {formatDate(item.created_at)}
          </p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">{t("amount")}:</p>
          <p className="text-[#24292F] text-sm font-medium">{item.price}sum</p>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#57606A] font-medium">{t("payment_status")}:</p>
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
              {t(`${item.status}`)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="cursor-pointer" onClick={handlePrint}>
          <BaseIcon name="download" color="#1CB854" />
        </div>
      </div>
    </div>
  );
};

export default MobileITem;
