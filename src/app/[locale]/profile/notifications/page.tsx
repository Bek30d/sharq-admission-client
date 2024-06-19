"use client";
import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import MessageItem from "./components/MessageItem";
import withAuth from "@/components/with-auth/WithAuth";
import { useTranslations } from "next-intl";

export type MessageType = {
  id: number;
  date: string;
  title: string;
  description: string;
  is_readed: boolean;
};

const messages: MessageType[] = [
  // {
  //   id: 1,
  //   date: "12.05.2022",
  //   title: "Hurmatli A’zamjon Ismoilov",
  //   description: `Sizning Sharq universitydagi Moliya fakultetiga qabul qilish arizangizni ko'rib chiqish jarayonida qo'shimcha hujjatlar talab qilinmoqda. Iltimos, quyidagi hujjatlarni taqdim eting:
  //   - IELTS
  //   - TOPIK
  //   Taqdim etish muddati: 29.05.2024
  //   Iltimos, talab qilingan hujjatlarni belgilangan muddat ichida bizga yuboring.
  //   Hurmat bilan,
  //   Sharq University Qabul Komissiyasi
  //   `,
  //   is_readed: false,
  // },
  // {
  //   id: 2,
  //   date: "12.05.2022",
  //   title: "Hurmatli A’zamjon Ismoilov",
  //   description: `Sizning Sharq universitydagi Moliya fakultetiga qabul qilish arizangiz hozirda ko'rib chiqilmoqda.
  //   Bizning qabul komissiyamiz sizning hujjatlaringizni ko'rib chiqmoqda va natijalar yaqin orada e'lon qilinadi.
  //   Hurmat bilan,
  //   Sharq University Qabul Komissiyasi
  //   `,
  //   is_readed: true,
  // },
];

const Notifications = () => {
  const t = useTranslations("Notifications");
  return (
    <SEO>
      <ProfileLayout title={t("notifications")}>
        {messages.length ? (
          messages.map((item) => <MessageItem key={item.id} {...item} />)
        ) : (
          <p className="text-[#424A53] font-medium text-lg text-center mt-10">
            {t("no_notifications")}
          </p>
        )}
      </ProfileLayout>
    </SEO>
  );
};

export default withAuth(Notifications);
