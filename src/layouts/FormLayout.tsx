import FormTab from "@/components/formTab";
import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-6">
      <FormTab />
      {children}
    </div>
  );
};

export default FormLayout;
