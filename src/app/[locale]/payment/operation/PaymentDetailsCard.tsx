import React from "react";
import Logo from "../../../../public/assets/logo_dark.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PaymentDetailsCard = () => {
  return (
    <div className="flex flex-col gap-4 p-4 shadow-md bg-white rounded flex-1">
      <Image src={Logo} alt="logo" />
      <p className="text-[#18324D]">OOO “Sharq university”</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center justify-between !bg-[#F0F2F5] !text-[#24292F]">
            <span>To’lov ma’lumotlari</span>
            <BaseIcon name="right" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <Image src={Logo} alt="logo" className="w-28" />
            </DialogTitle>
            <DialogDescription className="font-medium text-lg text-[#24292F]">
              To’lov ma’lumotlari
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEEF2]">
              <p className="text-[#18324D]">Xizmat narhi:</p>
              <p className="text-[#18324D]">0.00 uzs</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEEF2]">
              <p className="text-[#18324D]">Xizmat narhi:</p>
              <p className="text-[#18324D]">90486600</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEEF2]">
              <p className="text-[#18324D]">Terminal:</p>
              <p className="text-[#18324D]">92406421</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#EAEEF2]">
              <p className="text-[#18324D]">Status:</p>
              <div className="flex flex-col gap-2 items-end">
                <Badge className="w-fit !bg-green-400 px-1.5 py-1 rounded-md">
                  To’langan
                </Badge>
                <p className="text-sm text-[#18324D]">22.05.24 14:15</p>
              </div>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#EAEEF2]">
              <p className="text-[#18324D]">To’lov summasi:</p>
              <p className="text-[#18324D]">115 000 uzs</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between">
        <p className="text-[#18324D]">Status:</p>
        <div className="flex flex-col gap-2">
          <Badge variant="destructive" className="w-fit px-1.5 py-1 rounded-md">
            To’lanmagan
          </Badge>
          <p className="text-sm text-[#18324D]">22.05.24 14:15</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-[#18324D]">Status:</p>
        <p className="text-[#18324D] font-medium">115 000 uzs</p>
      </div>
      <div className="flex justify-between gap-4">
        <Button
          className="flex-1 group hover:!bg-[#18324D] duration-300 flex items-center gap-1.5 text-[#424A53]"
          variant={"outline"}
        >
          <BaseIcon name="cancel" cn="group-hover:text-white text-[#424A53]" />
          <span>Bekor qilish</span>
        </Button>
        <Button
          className="flex-1 group hover:!bg-[#18324D] duration-300 flex items-center gap-1.5 text-[#424A53]"
          variant={"outline"}
        >
          <BaseIcon name="share" cn="group-hover:text-white text-[#424A53]" />
          <span>Ulashish</span>
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
