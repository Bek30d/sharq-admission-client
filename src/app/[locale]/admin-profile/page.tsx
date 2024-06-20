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
import React, { useEffect, useState } from "react";
import ApplicationItem from "./components/ApplicationItem";
import FilterSidebar, { Filter } from "./components/FilterSidebar";
import { useAdminStore } from "@/store/admin.store";

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

const directions = [
  {
    value: "moliya",
    label: "Moliya",
  },
  {
    value: "kafedra",
    label: "Kafedra",
  },
  {
    value: "muhandis",
    label: "Muhandis",
  },
];

const AdminProfile = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const { getApplications, applications } = useAdminStore();
  const [filter, setFilter] = useState<Filter | null>(null);

  const handleChange = (e: any, param: keyof Filter) => {
    setFilter((prev) => ({
      ...prev,
      [param]: e,
    }));
  };

  useEffect(() => {
    getApplications(filter);
  }, [filter]);

  return (
    <AdminProfileLayout>
      <div>
        <div className="flex gap-3 items-center mb-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="ID yoki Talaba Ismi bo'yicha qidirish"
              className="!border-[#D0D7DE] !p-3 !pl-9"
              value={filter?.full_name}
              onChange={(e) => handleChange(e.target.value, "full_name")}
            />

            <BaseIcon
              name="search"
              cn="absolute left-2 top-1/2 -translate-y-1/2"
            />
          </div>

          <Select
            value={filter?.edu_direction}
            onValueChange={(e) => handleChange(e, "edu_direction")}
          >
            <SelectTrigger className="w-[232px] !border-[#D0D7DE] !py-3 h-auto">
              <SelectValue placeholder="Ta’lim yo’nalish" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {directions.map((item) => (
                  <SelectItem
                    key={item.label}
                    className="!text-[#24292F]"
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <AdminDatePicker key={"1"} filter={filter} setFilter={setFilter} />
          <Select
            value={filter?.status}
            onValueChange={(e) => handleChange(e, "status")}
          >
            <SelectTrigger className="w-[232px] !border-[#D0D7DE] !py-3 h-auto">
              <SelectValue placeholder="Ariza holati" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {applicationStatus.map((item) => (
                  <SelectItem
                    key={item.label}
                    className="!text-[#24292F]"
                    value={item.value}
                  >
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

        {applications.map((item) => (
          <ApplicationItem key={item.id} {...item} />
        ))}
      </div>

      <FilterSidebar
        filter={filter}
        setFilter={setFilter}
        isShowSideBar={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
    </AdminProfileLayout>
  );
};

export default AdminProfile;
