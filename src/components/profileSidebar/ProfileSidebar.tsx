"use client";

import React from "react";
import BaseIcon from "../icons/BaseIcon";
import icons from "../icons/icons";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export type LinkType = {
  path: string;
  name: string;
  icon: keyof typeof icons;
};

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("Sidebar");

  const links: LinkType[] = [
    {
      path: "/profile",
      name: t("profile"),
      icon: "user",
    },
    {
      path: "/profile/requests",
      name: t("requests"),
      icon: "request",
    },
    {
      path: "/profile/notifications",
      name: t("notifications"),
      icon: "bell",
    },
    {
      path: "/profile/applicant-info",
      name: t("applicant_info"),
      icon: "student_doc",
    },
    {
      path: "/profile/payment-history",
      name: t("payment_history"),
      icon: "payment_time",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg h-fit hidden sm:block">
      {links.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(item.path)}
          className="cursor-pointer"
        >
          <div
            className={`flex gap-2 items-center px-2 py-3 rounded-md ${
              pathname === item.path ? "bg-[#F6F8FA]" : ""
            }`}
          >
            <BaseIcon
              name={item.icon}
              width={24}
              height={24}
              color={pathname === item.path ? "#0055FB" : "#424A53"}
            />
            <p
              className={`${
                pathname === item.path ? "text-[#0055FB]" : "text-[#424A53]"
              } font-medium`}
            >
              {item.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSidebar;
