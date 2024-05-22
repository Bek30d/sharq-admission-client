"use client";

import React from "react";
import icons from "../icons/icons";
import BaseIcon from "../icons/BaseIcon";
import { usePathname, useRouter } from "next/navigation";

export type TabType = {
  title: string;
  description: string;
  icon: keyof typeof icons;
  path: string;
};

const FormTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs: TabType[] = [
    {
      title: "Shaxsiy ma’lumotlar",
      description: "Passport, manzil va  telefon raqam",
      icon: "personalCard",
      path: "/personal-info",
    },
    {
      title: "Ta’lim ma’lumotlari",
      description: "O’rta ta’lim va chet tili sertifikati",
      icon: "graduateDocument",
      path: "/education-info",
    },
    {
      title: "Yo’nalishni tanlsh",
      description: "Yo’nalish, mutaxassislik va ta’lim shakli",
      icon: "graduateHands",
      path: "/choose-direction",
    },
  ];

  return (
    <div className="p-4 bg-white w-full rounded-lg flex justify-between items-center">
      {tabs.map((item, index) => (
        <>
          <div
            onClick={() => router.push(item.path)}
            key={item.title}
            className="flex gap-2 items-center cursor-pointer"
          >
            <div className="bg-[#F5F8FF] rounded-full flex justify-center items-center w-14 h-14">
              <BaseIcon
                name={item.icon}
                viewBox="0 0 24 28"
                color={pathname === item.path ? "#0055FB" : "#18324D"}
              />
            </div>
            <div>
              <h2
                className={`text-xl font-semibold ${
                  pathname === item.path ? "text-[#0055FB]" : "text-[#18324D]"
                }`}
              >
                {item.title}
              </h2>
              <p className="text-sm text-[#57606A]">{item.description}</p>
            </div>
          </div>
          {index !== tabs.length - 1 ? (
            <BaseIcon name="arrowRight" color="#6E7781" />
          ) : null}
        </>
      ))}
    </div>
  );
};

export default FormTab;
