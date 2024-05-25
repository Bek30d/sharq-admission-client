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
import ReportItem from "../components/ReportItem";
import FilterSidebar from "../components/FilterSidebar";

export type ItemType = {
  id: number;
  education_direction: string;
  applications_number: number;
};

const items: ItemType[] = [
  {
    id: 1,
    education_direction: "Moliya",
    applications_number: 400,
  },
  {
    id: 2,
    education_direction: "Iqtisodiyot",
    applications_number: 240,
  },
  {
    id: 3,
    education_direction: "Buxgalteriya",
    applications_number: 310,
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

const Reports = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  return (
    <AdminProfileLayout>
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
                <SelectItem className="!text-[#24292F]" value={item.value}>
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
                <SelectItem className="!text-[#24292F]" value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex gap-3 items-center">
          <Button
            className="flex gap-2 items-cener border !border-[#338AF3] !bg-white py-2 !h-auto"
            onClick={() => setIsShowSideBar(true)}
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

      <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 justify-between">
        <div className="flex">
          <p className="w-[60px] text-center  text-[#57606A] font-medium">No</p>
          <p className="w-[292px] pl-5 text-[#57606A] font-medium">
            Ta’lim yo’nalish
          </p>
        </div>
        <p className="w-[562px] pl-5 text-[#57606A] font-medium">
          Arizalar soni
        </p>
      </div>

      {items.map((item) => (
        <ReportItem key={item.id} {...item} />
      ))}

      <FilterSidebar
        isShowSideBar={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
    </AdminProfileLayout>
  );
};

export default Reports;
