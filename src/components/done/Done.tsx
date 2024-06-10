import React from "react";
import BaseIcon from "../icons/BaseIcon";
import icons from "../icons/icons";
import Link from "next/link";
import FormLayout from "@/layouts/FormLayout";

const Card = ({ icon, title }: { icon: keyof typeof icons; title: string }) => {
  return (
    <div className="flex-1">
      <div className="w-[50px] h-[50px] rounded-full bg-[#F6F8FA] flex justify-center items-center mx-auto mb-3">
        <BaseIcon name={icon} width={26} height={26} />
      </div>
      <p className="text-center text-[#57606A] text-sm">{title}</p>
    </div>
  );
};
const Done = () => {
  const data: { icon: keyof typeof icons; title: string }[] = [
    {
      icon: "document_search",
      title: "Ariza topshirildi",
    },
    {
      icon: "document_search",
      title:
        "Qo'shimcha hujjatlar taqdim etilishi kerak bo'lsa, biz siz bilan bog'lanamiz.",
    },
    {
      icon: "document_search",
      title: "Imtihon yoki suhbat sanasi haqida sizga xabar beriladi.",
    },
  ];

  return (
    <FormLayout isHideTab>
      <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl">
        <div className="bg-[#EFFFF5] w-36 h-36 rounded-full mx-auto flex justify-center items-center mb-6">
          <div className="bg-[#D6FFE5] w-24 h-24 rounded-full flex justify-center items-center">
            <BaseIcon
              color="#1CB854"
              name="document"
              cn="z-10"
              viewBox="0 0 60 60"
              width={50}
              height={50}
            />
          </div>
        </div>

        <h1 className="text-[32px] font-semibold text-[#18324D] text-center mb-6">
          Ariza Muvaffaqiyatli Topshirildi!
        </h1>

        <div className="mb-12">
          <p className="text-[#18324D] text-center">
            Sizning arizangiz muvaffaqiyatli topshirildi.
          </p>
          <p className="text-[#18324D] text-center">
            Ariza raqamingiz: <span className="text-blue-500">0001</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {data.map((item) => (
            <Card icon={item.icon} title={item.title} key={item.icon} />
          ))}
        </div>

        <div className="flex justify-center gap-6 mb-4">
          <Link href="/" className="text-blue-500 underline">
            Asosiy sahifaga qaytish
          </Link>
          <Link href="/admin" className="text-blue-500 underline">
            Shaxsiy kabinetga otish
          </Link>
          <Link href="/personal-info" className="text-blue-500 underline">
            Yangi ariza topshirish
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <p className="text-sm">
            Telefon:
            <span className="text-blue-500"> +998 79 222-0009</span>
          </p>
          <p className="text-sm">
            Elektron pochta:
            <span className="text-blue-500"> sharq@talim.com</span>
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default Done;
