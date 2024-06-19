import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import Item from "./components/Item";
import MobileITem from "./components/MobileItem";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

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

async function getData(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/my-payment-histories",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("error");
  }

  return res.json();
}

const PaymentHistory = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const paymentHistory = await getData(token?.value || "");
  const t = await getTranslations("PaymentHistory");

  if (!token?.value) {
    redirect("/");
  }

  return (
    <SEO>
      <ProfileLayout title="To’lov tarixi">
        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1 ">
          <p className="pl-6 pr-5 text-[#57606A] font-medium">No</p>
          <p className="pl-5 pr-24 text-[#57606A] font-medium">{t("goal")}</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">{t("date")}</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">{t("amount")}</p>
          <p className="pl-5 pr-20 text-[#57606A] font-medium">
            {t("payment_status")}
          </p>
        </div>

        <div className="hidden lg:block">
          {paymentHistory?.data?.length ? (
            paymentHistory.data.map((item: ItemType, index: number) => (
              <Item key={item.id} {...item} />
            ))
          ) : (
            <p className="text-[#424A53] font-medium text-lg text-center mt-10">
              {t("no_payment")}
            </p>
          )}
        </div>
        <div className="block lg:hidden">
          {paymentHistory?.data?.length ? (
            items.map((item) => <MobileITem key={item.id} {...item} />)
          ) : (
            <p className="text-[#424A53] font-medium text-lg text-center mt-10">
              {t("no_payment")}
            </p>
          )}
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default PaymentHistory;
