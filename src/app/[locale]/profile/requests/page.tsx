import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import MobileITem from "./components/MobileITem";
import { cookies } from "next/headers";
import toast, { Toaster } from "react-hot-toast";
import Item from "./components/Item";

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

  return (
    <SEO>
      <ProfileLayout title="Arizalar">
        <Toaster />
        <div className="py-3.5 bg-white rounded-lg hidden lg:flex items-center mb-1">
          <p className="px-5 text-[#57606A] font-medium">No</p>
          <p className="pl-5 pr-9 text-[#57606A] font-medium">Ariza raqami</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">Berilgan sana</p>
          <p className="pl-5 pr-12 text-[#57606A] font-medium">Fakultet nomi</p>
          <p className="pl-5 pr-20 text-[#57606A] font-medium">Ariza statusi</p>
        </div>

        <div className="hidden lg:block">
          {myApplications?.data?.length ? (
            myApplications.data.map((item: ItemType, index: number) => (
              <Item key={item.apply_number} item={item} index={index} />
            ))
          ) : (
            <p className="text-[#424A53] font-medium text-lg text-center mt-10">
              Arizalar topilmadi
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
              Arizalar topilmadi
            </p>
          )}
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default Requests;
