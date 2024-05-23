import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import FaceInage from "../../public/assets/main_image.jpg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-48px)] relative flex lg:items-center justify-center">
      <div className="w-screen h-[calc(100%+48px)] absolute -top-12 -z-10 bg-gradient-to-b from-[#18324D] to-[#3874B3]" />
      <div className="flex lg:flex-row flex-col xl:gap-24 md:gap-10 md:justify-between xl flex-wrap justify-center">
        <div className="flex-1 my-6 flex flex-col xl:space-y-8 lg:space-y-6 md:space-y-6 space-y-6 md:justify-center justify-start md:items-start items-center lg:justify-start">
          <Image src={Logo} alt="logo" />
          <div className="h-4 md:hidden" />
          <p className="text-white md:font-medium font-semibold xl:text-6xl lg:text-5xl md:text-6xl text-3xl md:text-start text-center xl:leading-tight lg:leading-tight md:leading-tight leading-normal tracking-[-1.28px]">
            2024-2025 oʻquv yili uchun qabul{" "}
            <span className="md:inline lg:block">boshlandi</span>
          </p>
          <p className="text-white text-xl leading-snug tracking-wide md:text-start text-center">
            Maqsadimiz ta’lim orqali har tomonlama tanqidiy fikrlay oladigan o’z
            bilimi va salohiyati bilan o’zining va atrofdagilarning hayotini
            yaxshilay oladigan kadrlarni tayyorlashdir.
          </p>
          <div className="h-4 md:hidden" />
          <Button className="w-fit py-4 xl:px-12 md:px-8 !bg-white hover:!bg-[#18324D] duration-300 shadow-lg text-[#191919] hover:text-white">
            Ariza qoldirish
          </Button>
        </div>
        <div className="lg:block hidden flex-1">
          <Image
            src={FaceInage}
            alt="face"
            className="rounded-lg w-full mb-8"
            priority={false}
          />
        </div>
        <Image
          src={FaceInage}
          alt="face"
          className="rounded-lg w-full mb-8 block lg:hidden"
          priority={false}
        />
      </div>
    </main>
  );
}
