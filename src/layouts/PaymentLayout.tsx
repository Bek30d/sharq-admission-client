import Container from "@/components/container/Container";
import PaymentTab from "@/components/payment-tab/PaymentTab";
import React from "react";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="py-6">
        <PaymentTab />
        {children}
      </div>
    </Container>
  );
};

export default PaymentLayout;
