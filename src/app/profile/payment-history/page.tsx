import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import Item from "./components/Item";
import MobileITem from "./components/MobileItem";
import withAuth from "@/components/with-auth/WithAuth";

export type ItemType = {
  id: number;
  goal: string;
  date: string;
  amount: string;
  status: {
    value: string;
    label: string;
  };
};

const items: ItemType[] = [
  {
    id: 1,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "pending",
      label: "Kutilmoqda",
    },
  },
  {
    id: 2,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "accepted",
      label: "To'langan	",
    },
  },
  {
    id: 3,
    goal: "Ariza to'lovi",
    date: "20.05.2024",
    amount: "224 000 uzs",
    status: {
      value: "accepted",
      label: "To'langan	",
    },
  },
];

const PaymentHistory = () => {
  return (
    <SEO>
      <ProfileLayout title="To’lov tarixi">
        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
          <p className="pl-6 pr-5 text-[#57606A] font-medium">No</p>
          <p className="pl-5 pr-24 text-[#57606A] font-medium">Maqsad</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">
            To’lovlar sanasi
          </p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">Miqdor</p>
          <p className="pl-5 pr-20 text-[#57606A] font-medium">
            To’lov statusi
          </p>
        </div>

        <div className="hidden lg:block">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
        <div className="block lg:hidden">
          {items.map((item) => (
            <MobileITem key={item.id} {...item} />
          ))}
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default withAuth(PaymentHistory);
