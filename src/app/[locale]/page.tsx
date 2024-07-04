"use client";
import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
import FaceInage from "../../../public/assets/main_image.jpg";
import { Button } from "@/components/ui/button";
import Container from "@/components/container/Container";
import SEO from "@/layouts/SEO";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

export default function Home() {
  const token = localStorage.getItem("access_token");
  const t = useTranslations("Home");
  const router = useRouter();

  return (
    <SEO>
      <main
        className={`${
          token ? "min-h-[calc(100vh-56px)]" : "min-h-[calc(100vh-48px)]"
        } relative flex lg:items-center justify-center`}
      >
        <div className="w-full h-[calc(100%+48px)] absolute -top-12 -z-10 bg-gradient-to-b from-[#18324D] to-[#3874B3]" />
        <Container>
          <div className="flex lg:flex-row flex-col xl:gap-24 md:gap-10 md:justify-between xl flex-wrap justify-center">
            <div className="flex-1 my-6 flex flex-col xl:space-y-8 lg:space-y-6 md:space-y-6 space-y-6 md:justify-center justify-start md:items-start items-center lg:justify-start">
              <Image src={Logo} alt="logo" />
              <div className="h-4 md:hidden" />
              <p className="text-white md:font-medium font-semibold xl:text-6xl lg:text-5xl md:text-6xl text-3xl md:text-start text-center xl:leading-tight lg:leading-tight md:leading-tight leading-normal tracking-[-1.28px]">
                {t("title")}
              </p>
              <p className="text-white text-xl leading-snug tracking-wide md:text-start text-center">
                {t("description")}
              </p>
              <div className="h-4 md:hidden" />
              <Button
                onClick={() =>
                  token ? router.push("/personal-info") : router.push("/auth")
                }
                className="w-fit py-4 xl:px-12 md:px-8 !bg-white hover:!bg-[#18324D] duration-300 shadow-lg text-[#191919] hover:text-white"
              >
                {t("button")}
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
        </Container>
      </main>
    </SEO>
  );
}
