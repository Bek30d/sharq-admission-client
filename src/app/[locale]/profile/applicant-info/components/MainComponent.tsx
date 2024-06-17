"use client";

import Image from "next/image";
import React, { useRef } from "react";
import random from "../../../../../public/assets/random_image.jpg";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import { useReactToPrint } from "react-to-print";

const MainComponent = ({ applicantInfo }: { applicantInfo: any }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-3.5" ref={componentRef}>
        <h2 className="text-[#18324D] text-xl font-medium mb-4">
          Abituriyent qayd varaqasi
        </h2>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          Shaxsiy ma’lumotlar
        </h3>

        <div className="flex gap-4 items-center mb-4">
          <Image
            src={random}
            alt="image"
            width={160}
            height={160}
            className="rounded-full object-cover object-center !h-40"
          />

          <div>
            <p className="text-[#18324D]">
              <span className="font-semibold">ID:</span>{" "}
              {applicantInfo.data.data.ID}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">F.I.O:</span>{" "}
              {applicantInfo.data.data.full_name}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Pasport:</span>{" "}
              {applicantInfo.data.data.passportID}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">JShSHIR:</span>{" "}
              {applicantInfo.data.data.JShSHIR}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Tugilgan sanasi:</span> 01.21.1996
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Jinsi:</span>{" "}
              {applicantInfo.data.data.gender}
            </p>
          </div>
        </div>

        <p className="text-[#18324D] border-b border-[#D0D7DE] pb-4 mb-4">
          Doimiy yashash manzili: Navoiy viloyati, Qiziltepa tumani, Tavois MFY,
          Kosagaron qishlog’i, uy:74Tugatgan ta’lim muassasasi: 2010, Navoiy
          vilyati, Qiziltepa tumani, Qiziltepa maishiy xizamat ko’rsatish KHK,
          K1637027
        </p>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          Tanlangan ta’lim yo’nalishari
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span className="font-semibold">Ta’lim tili:</span>{" "}
            {applicantInfo.data.data.edu_lang}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">Test topshirish alifbiosi:</span>{" "}
            {applicantInfo.data.data.test_taking_alphabet}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">Chet tili:</span>
            {applicantInfo.data.data.is_cert_existed ? "Ha" : "Yo’q"}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">Test topshirish fanlari:</span>
            {applicantInfo.data.data.test_taking_subjects || "Yo’q"}
          </p>
        </div>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          Test sinovlari uchun to’lov holati
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span className="font-semibold">Invoys raqam:</span> 3539716075662
          </p>
          <p className="text-[#D80027]">
            <span className="font-semibold text-[#18324D]">To’lov holati:</span>
            {applicantInfo.data.data.fee_status === "paid"
              ? "To’langan"
              : "To’lanmagan"}
          </p>
        </div>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          Abituriyenga eslatma
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span>1.</span> Abituriyent ushbu qayd varaqadagi ma’lumotlarning
            to’g’riligiga shaxsan o’zi javobgar hisoblanadi.
          </p>
          <p className="text-[#18324D]">
            <span>1.</span> Abituriyent ushbu qayd varaqadagi ma’lumotlarning
            to’g’riligiga shaxsan o’zi javobgar hisoblanadi.
          </p>
          <p className="text-[#18324D]">
            <span>1.</span> Abituriyent ushbu qayd varaqadagi ma’lumotlarning
            to’g’riligiga shaxsan o’zi javobgar hisoblanadi.
          </p>
        </div>

        <p className="text-[#18324D]">
          Ro’yxatga olingan vaqt: <span>15:25:19 26.06.2024</span>
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handlePrint()}
          className="!bg-[#0969DA] !py-[14px] h-auto w-full sm:w-fit flex gap-2 items-center"
        >
          <BaseIcon name="download" color="white" />
          Saqlash
        </Button>
      </div>
    </>
  );
};

export default MainComponent;
