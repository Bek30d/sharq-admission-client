"use client";

import AdminProfileLayout from "@/layouts/AdminProfileLayout";
import React, { useEffect } from "react";
import ReportItem from "../components/ReportItem";
import { useAdminStore } from "@/store/admin.store";

export type ReportType = {
  id: number;
  apply_count: number;
  edu_direction: string;
};

const Reports = () => {
  const { reports, getReports } = useAdminStore();

  useEffect(() => {
    getReports();
  }, []);

  return (
    <AdminProfileLayout>
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

      {reports.map((item) => (
        <ReportItem key={item.id} {...item} />
      ))}
    </AdminProfileLayout>
  );
};

export default Reports;
