"use client";

import Link from "next/link";
import React from "react";
import BaseIcon from "../icons/BaseIcon";
import icons from "../icons/icons";
import { usePathname } from "next/navigation";

export type LinkType = {
  path: string;
  name: string;
  icon: keyof typeof icons;
};

const links: LinkType[] = [
  {
    path: "/profile",
    name: "Mening sahifam",
    icon: "user",
  },
  {
    path: "/profile/requests",
    name: "Arizalarim",
    icon: "request",
  },
  {
    path: "/profile/notifications",
    name: "Habarnomalar",
    icon: "bell",
  },
  {
    path: "/profile/applicant-info",
    name: "Abituriyent qayd varaqasi",
    icon: "student_doc",
  },
  {
    path: "/profile/payment-history",
    name: "To’lov tarixi",
    icon: "payment_time",
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="p-4 bg-white rounded-lg h-fit hidden sm:block">
      {links.map((item, index) => (
        <Link key={index} href={item.path}>
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
        </Link>
      ))}
    </div>
  );
};

export default ProfileSidebar;
