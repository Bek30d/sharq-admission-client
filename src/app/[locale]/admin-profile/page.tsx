"use client";
import AdminDatePicker from "@/components/adminFilterDatePicker/AdminDatePicker";
import BaseIcon from "@/components/icons/BaseIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminProfileLayout from "@/layouts/AdminProfileLayout";
import React, { useState } from "react";
import ApplicationItem from "./components/ApplicationItem";
import FilterSidebar from "./components/FilterSidebar";

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

const educationDirections = [
  {
    value: "moliya1",
    label: "Moliya",
  },
  {
    value: "kafedra1",
    label: "Kafedra",
  },
  {
    value: "moliya",
    label: "Moliya",
  },
  {
    value: "kafedra",
    label: "Kafedra",
  },
];

const applicationStatus = [
  {
    value: "accepted",
    label: "Qabul qilingan",
  },
  {
    value: "pending",
    label: "Ko’rib chiqilmoqda",
  },
  {
    value: "rejected",
    label: "Rad etildi",
  },
];

const AdminProfile = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  return (
    <AdminProfileLayout>
      <div>
        <div className="flex gap-3 items-center mb-3">
          <div className="relative">
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

          <Select>
            <SelectTrigger className="w-[232px] !border-[#D0D7DE] !py-3 h-auto">
              <SelectValue placeholder="Ta’lim yo’nalish" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {educationDirections.map((item) => (
                  <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <AdminDatePicker />

          <Select>
            <SelectTrigger className="w-[232px] !border-[#D0D7DE] !py-3 h-auto">
              <SelectValue placeholder="Ariza holati" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {applicationStatus.map((item) => (
                  <SelectItem key={item.label} className="!text-[#24292F]" value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex gap-3 items-center">
            <Button
              className="flex gap-2 items-cener border !border-[#338AF3] !bg-white py-2 !h-auto"
              onClick={() => setIsShowSideBar(!isShowSideBar)}
            >
              <BaseIcon name="filter" color="#0055FB" />
              <p className="text-[#0055FB]">Filter</p>
            </Button>

            <Button className="flex gap-2 items-cener border !border-[#1CB854] !bg-white py-2 !h-auto">
              <BaseIcon name="download" color="#1CB854" />
              <p className="text-[#1CB854]">XLS</p>
            </Button>
          </div>
        </div>

        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
          <p className="w-[60px] text-center  text-[#57606A] font-medium">No</p>
          <p className="w-[265px] pl-5 text-[#57606A] font-medium">
            Ariza raqami
          </p>
          <p className="w-[265px] pl-5 text-[#57606A] font-medium">
            Berilgan sana
          </p>
          <p className="w-[265px] pl-5 text-[#57606A] font-medium">
            Fakultet nomi
          </p>
          <p className="w-[265px] pl-5 text-[#57606A] font-medium">
            Ariza statusi
          </p>
        </div>

        {items.map((item) => (
          <ApplicationItem key={item.id} {...item} />
        ))}
      </div>

      <FilterSidebar
        isShowSideBar={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
    </AdminProfileLayout>
  );
};

export default AdminProfile;
