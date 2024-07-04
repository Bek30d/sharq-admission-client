import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import MobileITem from "./components/MobileITem";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import Item from "./components/Item";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export type ItemType = {
  apply_number: string;
  created_at: string;
  faculty: string;
  status: string;
};

async function getData(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/my-applications",
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
const Requests = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const myApplications = await getData(token?.value || "");
  const t = await getTranslations("Requests");

  if (!token?.value) {
    redirect("/");
  }

  return (
    <SEO>
      <ProfileLayout title={t("requests")}>
        <Toaster />
        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1">
          <p className="px-5 text-[#57606A] font-medium">No</p>
          <p className="pl-5 pr-9 text-[#57606A] font-medium">
            {t("request_number")}
          </p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">{t("date")}</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">
            {t("faculty_name")}
          </p>
          <p className="pl-5 pr-20 text-[#57606A] font-medium">
            {t("request_status")}
          </p>
        </div>

        <div className="hidden lg:block">
          {myApplications?.data?.length ? (
            myApplications.data.map((item: ItemType, index: number) => (
              <Item key={item.apply_number} item={item} index={index} />
            ))
          ) : (
            <p className="text-[#424A53] font-medium text-lg text-center mt-10">
              {t("no_requests")}
            </p>
          )}
        </div>
        <div className="block lg:hidden">
          {myApplications?.data?.length ? (
            myApplications.data.map((item: ItemType) => (
              <MobileITem key={item.apply_number} item={item} />
            ))
          ) : (
            <p className="text-[#424A53] font-medium text-lg text-center mt-10">
              {t("no_requests")}
            </p>
          )}
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default Requests;
