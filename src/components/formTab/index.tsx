"use client";

import React from "react";
import icons from "../icons/icons";
import BaseIcon from "../icons/BaseIcon";
import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

export type TabType = {
  title: string;
  description: string;
  icon: keyof typeof icons;
  path: string;
};

const FormTab = () => {
  const pathname = usePathname();
  const t = useTranslations("FormTab");

  const tabs: TabType[] = [
    {
      title: t("title_1"),
      description: t("description_1"),
      icon: "personalCard",
      path: "/personal-info",
    },
    {
      title: t("title_2"),
      description: t("description_2"),
      icon: "graduateDocument",
      path: "/education-info",
    },
    {
      title: t("title_3"),
      description: t("description_3"),
      icon: "graduateHands",
      path: "/choose-direction",
    },
  ];

  return (
    <div className="p-4 bg-white w-full rounded-lg hidden justify-between items-center md:flex">
      {tabs.map((item, index) => (
        <>
          <div key={item.title} className="flex gap-2 items-center">
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
              <p className="hidden lg:block text-sm text-[#57606A]">
                {item.description}
              </p>
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
