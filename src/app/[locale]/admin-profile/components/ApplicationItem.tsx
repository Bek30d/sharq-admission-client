import BaseIcon from "@/components/icons/BaseIcon";
import { ApplicationT } from "@/store/admin.store";
import { useRouter } from "next/navigation";
import React from "react";

const statusLabels = {
  pending: "Kutilmoqda",
  accepted: "Qabul qilingan",
  rejected: "Rad etildi",
}

const ApplicationItem = (
  { id,
    edu_direction,
    edu_type,
    full_name,
    status,
  }: ApplicationT) => {

  const router = useRouter();

  const handleOpenDetails = () => router.push(`/admin-profile/${id}`)

  return (
    <button onClick={handleOpenDetails} className="py-[22px] bg-white rounded-lg flex justify-between mb-2 cursor-pointer">
      <div className=" flex items-center">
        <p className="w-[60px] text-center text-[#24292F] text-sm font-medium">
          {id}
        </p>

        <p className="w-[265px] pl-5  text-[#24292F] text-sm font-medium">
          {full_name}
        </p>

        <p className="w-[265px] pl-5  text-[#24292F] text-sm font-medium">
          {edu_direction}
        </p>

        <p className="w-[265px] pl-5  text-[#24292F] text-sm font-medium !whitespace-normal">
          {edu_type}
        </p>

        <div className="w-[265px] pl-5  flex items-center gap-2 ">
          <div
            className={`w-2.5 h-2.5 rounded-full ${status === "pending"
              ? "bg-[#F39B33]"
              : status === "accepted"
                ? "bg-[#1CB854]"
                : "bg-[#FF0000]"
              }`}
          ></div>
          <p className="text-center text-[#24292F] text-sm font-medium !whitespace-normal">
            {statusLabels[status]}
          </p>
        </div>
      </div>

      <div className="flex gap-3 items-center px-5">
        <div className="cursor-pointer">
          <BaseIcon name="download" color="#1CB854" />
        </div>
        <div className="cursor-pointer">
          <BaseIcon name="pencil" color="#0055FB" />
        </div>
      </div>
    </button>
  );
};

export default ApplicationItem;
