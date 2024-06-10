import Container from "@/components/container/Container";
import FormTab from "@/components/formTab";
import React from "react";

const FormLayout = ({
  children,
  isHideTab = false,
}: {
  children: React.ReactNode;
  isHideTab?: boolean;
}) => {
  return (
    <Container>
      <div className="py-6">
        {!isHideTab ? <FormTab /> : null}
        {children}
      </div>
    </Container>
  );
};

export default FormLayout;
