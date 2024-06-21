"use client";
import PaymentLayout from "@/layouts/PaymentLayout";
import React, { useState } from "react";
import Payme from "../../../../public/assets/payme.png";
import Click from "../../../../public/assets/click.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Wrapper from "./Wrapper";
import { useRouter } from "@/navigation";
import { usePaymentStore } from "@/store/payment.store";

const paymentMethods = [
  {
    name: "payme",
    img: Payme,
    url: "",
  },
  {
    name: "click",
    img: Click,
    url: "",
  },
];

const Payment = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("payme");
  const { getBillingUrl } = usePaymentStore()

  const redirect = () => {
    getBillingUrl(selected, '7').then((url) => window.location.href = url)
  }

  return (
    <PaymentLayout>
      <Wrapper title="To’lov predmetini tanlang">
        <div className="flex gap-6">
          {paymentMethods.map((item) => (
            <button
              onClick={() => setSelected(item.name)}
              key={item.name}
              className="flex flex-col gap-4 items-center"
            >
              <div
                className={`md:w-60 md:h-60 h-32 w-full flex justify-center items-center rounded-lg border-2 ${selected === item.name
                  ? "bg-[#E8F0FF] border-[#0055FB]"
                  : "bg-[#F6F8FA] border-[#F6F8FA]"
                  }`}
              >
                <Image src={item.img} alt={item.name} className="max-w-[90%]" />
              </div>
              <span className="text-[#18324D] font-medium text-center capitalize">
                {item.name}
              </span>
            </button>
          ))}
        </div>
        <Button
          className="!bg-[#18324D] w-full !py-[14px] h-auto"
          onClick={redirect}
        >
          Davom etish
        </Button>
      </Wrapper>
    </PaymentLayout>
  );
};

export default Payment;
