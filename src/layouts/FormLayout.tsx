import FormTab from "@/components/formTab";
import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FormTab />
      {children}
    </div>
  );
};

export default FormLayout;
