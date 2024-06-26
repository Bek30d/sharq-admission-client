"use client";
import BaseIcon from "../icons/BaseIcon";
import Uzbekistan from "../../../public/assets/uzbekistan.png";
import UnitedKingdom from "../../../public/assets/united_kingdom.png";
import Russia from "../../../public/assets/russia.png";
import Image from "next/image";
import HamburgerButton from "../hamburger-button/HamburgerButton";
import { useIndexStore } from "@/store";
import Logo from "../../../public/assets/logo.svg";
import Link from "next/link";
import { LinkType } from "../profileSidebar/ProfileSidebar";
import Container from "../container/Container";
import { useEffect } from "react";
import { userStore } from "@/store/main.store";
import { useLocalStorage } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const { user, getMyData } = userStore();
  const { isOpenBurger, setIsOpenBurger } = useIndexStore();
  const [_, serUserData] = useLocalStorage("userData", {});
  const token = localStorage.getItem("access_token");
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Sidebar");

  const links: LinkType[] = [
    {
      path: "/profile",
      name: t("profile"),
      icon: "user",
    },
    {
      path: "/profile/requests",
      name: t("requests"),
      icon: "request",
    },
    {
      path: "/profile/notifications",
      name: t("notifications"),
      icon: "bell",
    },
    {
      path: "/profile/applicant-info",
      name: t("applicant_info"),
      icon: "student_doc",
    },
    {
      path: "/profile/payment-history",
      name: t("payment_history"),
      icon: "payment_time",
    },
  ];

  useEffect(() => {
    if (token) {
      getMyData();
    }
  }, [token]);

  useEffect(() => {
    serUserData(user);
  }, [user]);

  const handleChangeLanguage = (lang: string) => {
    router.push(pathname, { locale: lang });
  };

  return (
    <div className="w-full bg-[#18324D]">
      <Container>
        <div className="md:flex py-3 justify-between items-center hidden">
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              className={`${pathname === "/" ? "hidden" : ""} w-24`}
            />
          </Link>
          <div className="flex items-center justify-end gap-12">
            <a
              href="tel:+998712345678"
              className="text-white font-medium text-sm"
            >
              +998 77 500-50-60
            </a>
            <div className="flex gap-4">
              <a href="#">
                <BaseIcon
                  name="facebook"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
              <a href="#">
                <BaseIcon
                  name="instagram"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
              <a href="#">
                <BaseIcon
                  name="telegram"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
            </div>
            <div className="flex gap-4">
              <button onClick={() => handleChangeLanguage("uz")}>
                <Image
                  src={Uzbekistan}
                  alt="uzbekistan flag"
                  width={20}
                  height={20}
                />
              </button>
              <button onClick={() => handleChangeLanguage("ru")}>
                <Image src={Russia} alt="Russia flag" width={20} height={20} />
              </button>
              <button onClick={() => handleChangeLanguage("en")}>
                <Image
                  src={UnitedKingdom}
                  alt="UnitedKingdom flag"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {token ? (
              <div
                onClick={() => router.push("/profile")}
                className="w-8 h-8 flex justify-center items-center bg-[#F5F8FF] rounded-full cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    <BaseIcon name="user" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      <div className={`md:hidden flex flex-col opacity-100 w-full pl-4`}>
        <div
          className={`${
            pathname === "/" ? "justify-end" : "justify-between"
          } flex items-center h-full`}
        >
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="logo"
              className={`${pathname === "/" ? "hidden" : ""} w-24`}
            />
          </Link>
          <HamburgerButton />
        </div>
        {pathname.includes("/profile") ? (
          <div
            className={`z-10 absolute overflow-hidden whitespace-nowrap right-0 top-12 h-[calc(100vh-48px)] flex flex-col bg-white justify-center items-center gap-4 duration-300 ${
              isOpenBurger ? "w-full" : "w-0"
            }`}
          >
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpenBurger(false)}
              >
                <div
                  className={`flex gap-2 w-full items-center px-2 py-3 rounded-md ${
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
                      pathname === item.path
                        ? "text-[#0055FB]"
                        : "text-[#424A53]"
                    } font-medium`}
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className={`z-10 absolute overflow-hidden whitespace-nowrap right-0 h-screen flex flex-col bg-gradient-to-b from-[#18324D] to-[#3874B3] justify-center items-center gap-16 duration-300 ${
              isOpenBurger ? "w-full" : "w-0"
            }`}
          >
            <a
              href="tel:+998712345678"
              className="text-white font-medium text-sm"
            >
              +998 77 500-50-60
            </a>
            <div className="flex gap-4">
              <a href="#">
                <BaseIcon
                  name="facebook"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
              <a href="#">
                <BaseIcon
                  name="instagram"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
              <a href="#">
                <BaseIcon
                  name="telegram"
                  color="transparent"
                  cn="w-6 h-6"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              </a>
            </div>
            <div className="flex gap-4">
              <button>
                <Image
                  src={Uzbekistan}
                  alt="uzbekistan flag"
                  width={20}
                  height={20}
                />
              </button>
              <button>
                <Image src={Russia} alt="Russia flag" width={20} height={20} />
              </button>
              <button>
                <Image
                  src={UnitedKingdom}
                  alt="UnitedKingdom flag"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
