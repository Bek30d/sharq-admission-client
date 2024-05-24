import Wrapper from "@/app/payment/Wrapper";
import PaymentDetailsCard from "@/app/payment/operation/PaymentDetailsCard";
import React from "react";

const OperationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Wrapper title="To’lov cheki">
            <div className="flex gap-12">
                <PaymentDetailsCard />
                {children}
            </div>
        </Wrapper>
    );
};

export default OperationLayout;
