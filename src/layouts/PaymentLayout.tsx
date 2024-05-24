import PaymentTab from "@/components/payment-tab/PaymentTab";
import React from "react";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <PaymentTab />
            {children}
        </div>
    );
};

export default PaymentLayout;
