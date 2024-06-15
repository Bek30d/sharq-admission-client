'use client'
import SEO from '@/layouts/SEO'
import Image from 'next/image'
import React, { useEffect } from 'react'
import random from '../../../../public/assets/random_image.jpg'
import BaseIcon from "@/components/icons/BaseIcon";
import { Button } from "@/components/ui/button";
import { useAdminStore } from '@/store/admin.store'
import { useParams } from 'next/navigation'

const ApplicationDetails = () => {
  const { getApplicationsDetails, details, isLoading } = useAdminStore();
  const { id } = useParams();

  useEffect(() => {
    getApplicationsDetails(+id);
  }, [])

  console.log('details', details);

  return (
    <SEO>
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        ) :
          details ? (
            <>
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
                      <span className="font-semibold">ID:</span> {details.ID ?? "-"}
                    </p>
                    <p className="text-[#18324D]">
                      <span className="font-semibold">F.I.O:</span> {details.full_name ?? "-"}
                    </p>
                    <p className="text-[#18324D]">
                      <span className="font-semibold">Pasport:</span> {details.passportID ?? "-"}
                    </p>
                    <p className="text-[#18324D]">
                      <span className="font-semibold">JShSHIR:</span> {details.JShSHIR ?? "-"}
                    </p>
                    <p className="text-[#18324D]">
                      <span className="font-semibold">Tugilgan sanasi:</span>{" "}
                      01.21.1996
                    </p>
                    <p className="text-[#18324D]">
                      <span className="font-semibold">Jinsi:</span> {details.gender ?? "-"}
                    </p>
                  </div>
                </div>

                <p className="text-[#18324D] border-b border-[#D0D7DE] pb-4 mb-4">
                  Doimiy yashash manzili: {details.permanent_address ?? "-"}
                </p>

                <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
                  Tanlangan ta’lim yo’nalishari
                </h3>

                <div className="border-b border-[#D0D7DE] pb-4 mb-4">
                  <p className="text-[#18324D]">
                    <span className="font-semibold">Ta’lim tili:</span> {details.edu_lang ?? "-"}
                  </p>
                  <p className="text-[#18324D]">
                    <span className="font-semibold">Test topshirish alifbiosi:</span>{" "}
                    Lotin Jasur o’g’li
                  </p>
                  <p className="text-[#18324D]">
                    <span className="font-semibold">Chet tili:</span>{details.is_cert_existed ?? "-"}
                  </p>
                  <p className="text-[#18324D]">
                    <span className="font-semibold">Test topshirish fanlari:</span>
                    Kimyo(3.1), Matematika (2.1), O’zbek tili (1.1), Matematika (1.1),
                    Tarix (1.1)
                  </p>
                </div >

                <h3 className="py-1 px-2 text-white bg-[#18324D] mb-4">
                  Test sinovlari uchun to’lov holati
                </h3>

                <div className="border-b border-[#D0D7DE] pb-4 mb-4">
                  <p className="text-[#18324D]">
                    <span className="font-semibold">Invoys raqam:</span> {details.invoice_number ?? "-"}
                  </p>
                  <p className={details.fee_status ? "text-green-500" : "text-[#D80027]"}>
                    <span className="font-semibold text-[#18324D]">
                      To’lov holati: {" "}
                    </span>
                    {details.fee_status ? "To’langan" : "To’lov amalga oshirilmagan"}
                  </p>
                </div >

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
                </div >

                <p className="text-[#18324D]">
                  Ro’yxatga olingan vaqt: <span>{details.created_at ?? "-"}</span>
                </p>
              </div >

              <div className="flex justify-end">
                <Button className="!bg-[#0969DA] !py-[14px] h-auto w-full sm:w-fit flex gap-2 items-center">
                  <BaseIcon name="download" color="white" />
                  Saqlash
                </Button>
              </div>
            </>
          ) : (
            <p className="text-[#18324D]">Bunday abituriyent topilmadi</p>
          )
      }


    </SEO>
  )
}

export default ApplicationDetails