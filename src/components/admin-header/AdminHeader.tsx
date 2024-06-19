"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import icons from "../icons/icons";
import Link from "next/link";
import BaseIcon from "../icons/BaseIcon";
import { usePathname } from "@/navigation";

export type LinkType = {
  path: string;
  name: string;
  icon: keyof typeof icons;
};

export const links: LinkType[] = [
  {
    path: "/admin-profile",
    name: "Abaituriyent arizalari",
    icon: "student_doc",
  },
  // {
  //   path: "/admin-profile/payments",
  //   name: "To’lovlar",
  //   icon: "payment_time",
  // },
  {
    path: "/admin-profile/reports",
    name: "Hisobotlar",
    icon: "reports",
  },
];

const AdminHeader = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white p-3 rounded-lg mt-6 mb-3 flex justify-between items-center">
      <div className="flex items-center gap-1.5">
        {links.map((item, index) => (
          <Link key={index} href={item.path}>
            <div
              className={`flex gap-2 items-center px-3.5 py-3 rounded-md ${pathname === item.path ? "bg-[#F6F8FA]" : ""
                }`}
            >
              <BaseIcon
                name={item.icon}
                width={24}
                height={24}
                color={pathname === item.path ? "#0055FB" : "#424A53"}
              />
              <p
                className={`${pathname === item.path ? "text-[#0055FB]" : "text-[#424A53]"
                  } font-medium`}
              >
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AdminHeader;
