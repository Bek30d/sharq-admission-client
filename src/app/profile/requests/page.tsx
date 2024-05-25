import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import Item from "./components/Item";
import MobileITem from "./components/MobileITem";

export type ItemType = {
  id: number;
  number: string;
  date: string;
  faculty_name: string;
  status: {
    value: string;
    label: string;
  };
};

const items: ItemType[] = [
  {
    id: 1,
    number: "0001",
    date: "20.05.2024",
    faculty_name: "Moliya va iqtisod",
    status: {
      value: "pending",
      label: "Ko’rib chiqilmoqda",
    },
  },
  {
    id: 2,
    number: "0002",
    date: "20.05.2024",
    faculty_name: "Moliya va iqtisod",
    status: {
      value: "accepted",
      label: "Qabul qilingan",
    },
  },
  {
    id: 3,
    number: "0003",
    date: "20.05.2024",
    faculty_name: "Moliya va iqtisod",
    status: {
      value: "rejected",
      label: "Rad etildi",
    },
  },
];

const Requests = () => {
  return (
    <SEO>
      <ProfileLayout title="Arizalar">
        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
          <p className="px-5 text-[#57606A] font-medium">No</p>
          <p className="pl-5 pr-9 text-[#57606A] font-medium">Ariza raqami</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">Berilgan sana</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">Fakultet nomi</p>
          <p className="pl-5 pr-20 text-[#57606A] font-medium">Ariza statusi</p>
        </div>

        <div className="hidden lg:block">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
        <div className="block lg:hidden">
          {items.map((item) => (
            <MobileITem key={item.id} {...item} />
          ))}
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default Requests;
