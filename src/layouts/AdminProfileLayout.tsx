import AdminHeader from "@/components/admin-header/AdminHeader";
import React from "react";

const AdminProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6">
      <AdminHeader />
      {children}
    </div>
  );
};

export default AdminProfileLayout;
