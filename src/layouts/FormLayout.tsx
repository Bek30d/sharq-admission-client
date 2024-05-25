import Container from "@/components/container/Container";
import FormTab from "@/components/formTab";
import React from "react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="py-6">
        <FormTab />
        {children}
      </div>
    </Container>
  );
};

export default FormLayout;
