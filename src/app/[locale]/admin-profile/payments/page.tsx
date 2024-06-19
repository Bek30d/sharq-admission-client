import AdminDatePicker from "@/components/adminFilterDatePicker/AdminDatePicker";
import BaseIcon from "@/components/icons/BaseIcon";
import { Input } from "@/components/ui/input";
import AdminProfileLayout from "@/layouts/AdminProfileLayout";
import React from "react";
import PaymentItem from "../components/PaymentItem";

export type ItemType = {
  id: number;
  goal: string;
  date: string;
  amount: string;
  status: {
    value: string;
    label: string;
  };
};

const items: ItemType[] = [
  {
    id: 1,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "pending",
      label: "Kutilmoqda",
    },
  },
  {
    id: 2,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "accepted",
      label: "To'langan	",
    },
  },
  {
    id: 3,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "accepted",
      label: "To'langan	",
    },
  },
];

const Payments = () => {
  return (
    <AdminProfileLayout>
      <div className="flex gap-3 items-center mb-3 justify-between">
        <div className="relative w-96">
          <Input
            type="text"
            placeholder="ID yoki Talaba Ismi bo'yicha qidirish"
            className="!border-[#D0D7DE] !p-3 !pl-9"
          />

          <BaseIcon
            name="search"
            cn="absolute left-2 top-1/2 -translate-y-1/2"
          />
        </div>

        <AdminDatePicker />
      </div>

      <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
        <p className="w-[60px] text-center  text-[#57606A] font-medium">No</p>
        <p className="w-[292px] pl-5 text-[#57606A] font-medium">
          Ariza raqami
        </p>
        <p className="w-[292px] pl-5 text-[#57606A] font-medium">
          Berilgan sana
        </p>
        <p className="w-[292px] pl-5 text-[#57606A] font-medium">
          Fakultet nomi
        </p>
        <p className="w-[292px] pl-5 text-[#57606A] font-medium">
          Ariza statusi
        </p>
      </div>

      {items.map((item) => (
        <PaymentItem key={item.id} {...item} />
      ))}
    </AdminProfileLayout>
  );
};

export default Payments;
