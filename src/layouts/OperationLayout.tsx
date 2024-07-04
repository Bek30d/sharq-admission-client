import Wrapper from "@/app/[locale]/payment/Wrapper";
import PaymentDetailsCard from "@/app/[locale]/payment/operation/PaymentDetailsCard";
import React from "react";

const OperationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper title="To’lov cheki">
      <div className="flex gap-12 md:flex-row flex-col">
        <PaymentDetailsCard />
        {children}
      </div>
    </Wrapper>
  );
};

export default OperationLayout;
