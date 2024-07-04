import AdminHeader from "@/components/admin-header/AdminHeader";
import Container from "@/components/container/Container";
import React from "react";

const AdminProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="mt-6 min-h-screen">
        <AdminHeader />
        {children}
      </div>
    </Container>
  );
};

export default AdminProfileLayout;
