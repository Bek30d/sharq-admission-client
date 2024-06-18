"use client";

import Image from "next/image";
import React, { useRef } from "react";
import random from "../../../../../../public/assets/random_image.jpg";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import { useReactToPrint } from "react-to-print";
import { useTranslations } from "next-intl";

const MainComponent = ({ applicantInfo }: { applicantInfo: any }) => {
  const componentRef = useRef(null);
  const t = useTranslations("ApplicantInfo");

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-3.5" ref={componentRef}>
        <h2 className="text-[#18324D] text-xl font-medium mb-4">
          {t("title")}
        </h2>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          {t("personal_info")}
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
              <span className="font-semibold">{t("id")}:</span>{" "}
              {applicantInfo.data.data.ID}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">{t("f_i_o")}:</span>{" "}
              {applicantInfo.data.data.full_name}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">{t("passport_number")}:</span>{" "}
              {applicantInfo.data.data.passportID}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">{t("jshshir")}:</span>{" "}
              {applicantInfo.data.data.JShSHIR}
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">{t("birthday")}:</span> 01.21.1996
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">{t("gender")}:</span>{" "}
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
          {t("education_info")}
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span className="font-semibold">{t("edu_lang")}:</span>{" "}
            {applicantInfo.data.data.edu_lang}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">{t("test_taking_alphabet")}:</span>{" "}
            {applicantInfo.data.data.test_taking_alphabet}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">{t("foreign_lang")}:</span>
            {applicantInfo.data.data.is_cert_existed ? "Ha" : "Yo’q"}
          </p>
          <p className="text-[#18324D]">
            <span className="font-semibold">{t("test_taking_subjects")}:</span>
            {applicantInfo.data.data.test_taking_subjects || "Yo’q"}
          </p>
        </div>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          {t("payment_status")}
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span className="font-semibold">{t("invoys_number")}:</span>{" "}
            3539716075662
          </p>
          <p className="text-[#D80027]">
            <span className="font-semibold text-[#18324D]">{t("status")}:</span>
            {applicantInfo.data.data.fee_status === "paid"
              ? t("paid")
              : t("unpaid")}
          </p>
        </div>

        <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
          {t("note_to_applicant")}
        </h3>

        <div className="border-b border-[#D0D7DE] pb-4 mb-4">
          <p className="text-[#18324D]">
            <span>1.</span> {t("note_desc")}
          </p>
        </div>

        <p className="text-[#18324D]">
          {t("date")} <span>15:25:19 26.06.2024</span>
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => handlePrint()}
          className="!bg-[#0969DA] !py-[14px] h-auto w-full sm:w-fit flex gap-2 items-center"
        >
          <BaseIcon name="download" color="white" />
          {t("save")}
        </Button>
      </div>
    </>
  );
};

export default MainComponent;
