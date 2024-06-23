import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import MessageItem from "./components/MessageItem";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/navigation";

export type MessageType = {
  id: number;
  date: string;
  title: string;
  description: string;
  is_readed: boolean;
};

async function getData(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/send-notification",
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

const Notifications = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const myNotifications = await getData(token?.value || "");
  const t = await getTranslations("Notifications");

  if (!token?.value) {
    redirect("/");
  }

  return (
    <SEO>
      <ProfileLayout title={t("notifications")}>
        {myNotifications.data.length ? (
          myNotifications.data.map((item: any) => (
            <MessageItem key={item.id} {...item} />
          ))
        ) : (
          <p className="text-[#424A53] font-medium text-lg text-center mt-10">
            {t("no_notifications")}
          </p>
        )}
      </ProfileLayout>
    </SEO>
  );
};

export default Notifications;
