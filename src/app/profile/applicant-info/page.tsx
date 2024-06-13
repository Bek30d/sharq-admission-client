"use client";
import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import Image from "next/image";
import React from "react";
import random from "../../../../public/assets/random_image.jpg";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icons/BaseIcon";
import withAuth from "@/components/with-auth/WithAuth";

const ApplicantInfo = () => {
  return (
    <SEO>
      <ProfileLayout title="Abituriyent qayd varaqasi">
        <div className="bg-white rounded-lg p-6 mb-3.5">
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
                <span className="font-semibold">ID:</span> 2785823
              </p>
              <p className="text-[#18324D]">
                <span className="font-semibold">F.I.O:</span> Botir Toshmatov
                Jasur o’g’li
              </p>
              <p className="text-[#18324D]">
                <span className="font-semibold">Pasport:</span> AB 2734709
              </p>
              <p className="text-[#18324D]">
                <span className="font-semibold">JShSHIR:</span> 67354672364758
              </p>
              <p className="text-[#18324D]">
                <span className="font-semibold">Tugilgan sanasi:</span>{" "}
                01.21.1996
              </p>
              <p className="text-[#18324D]">
                <span className="font-semibold">Jinsi:</span> Erkak
              </p>
            </div>
          </div>

          <p className="text-[#18324D] border-b border-[#D0D7DE] pb-4 mb-4">
            Doimiy yashash manzili: Navoiy viloyati, Qiziltepa tumani, Tavois
            MFY, Kosagaron qishlog’i, uy:74 Tugatgan ta’lim muassasasi: 2010,
            Navoiy vilyati, Qiziltepa tumani, Qiziltepa maishiy xizamat
            ko’rsatish KHK, K1637027
          </p>

          <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
            Tanlangan ta’lim yo’nalishari
          </h3>

          <div className="border-b border-[#D0D7DE] pb-4 mb-4">
            <p className="text-[#18324D]">
              <span className="font-semibold">Ta’lim tili:</span> O’zbekcha
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Test topshirish alifbiosi:</span>{" "}
              Lotin Jasur o’g’li
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Chet tili:</span>Yo’q
            </p>
            <p className="text-[#18324D]">
              <span className="font-semibold">Test topshirish fanlari:</span>
              Kimyo(3.1), Matematika (2.1), O’zbek tili (1.1), Matematika (1.1),
              Tarix (1.1)
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
              <span className="font-semibold text-[#18324D]">
                To’lov holati:
              </span>
              To’lov amalga oshirilmagan
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
          <Button className="!bg-[#0969DA] !py-[14px] h-auto w-full sm:w-fit flex gap-2 items-center">
            <BaseIcon name="download" color="white" />
            Saqlash
          </Button>
        </div>
      </ProfileLayout>
    </SEO>
  );
};

export default withAuth(ApplicantInfo);
