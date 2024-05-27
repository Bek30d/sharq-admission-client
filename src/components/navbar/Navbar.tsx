"use client";
import BaseIcon from "../icons/BaseIcon";
import Uzbekistan from "../../../public/assets/uzbekistan.png";
import UnitedKingdom from "../../../public/assets/united_kingdom.png";
import Russia from "../../../public/assets/russia.png";
import Image from "next/image";
import HamburgerButton from "../hamburger-button/HamburgerButton";
import { useIndexStore } from "@/store";
import Logo from "../../../public/assets/logo.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { links } from "../profileSidebar/ProfileSidebar";

const Navbar = () => {
  const { isOpenBurger, setIsOpenBurger } = useIndexStore();
  const path = usePathname();

  return (
    <div className="w-full h-12 bg-[#18324D]">
      <div className="md:flex pt-1.5 justify-between items-center hidden">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            className={`${path === "/" ? "hidden" : ""} w-24`}
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
      </div>
      <div className={`md:hidden flex flex-col opacity-100 w-full `}>
        <div
          className={`${path === "/" ? "justify-end" : "justify-between"
            } flex items-center h-full`}
        >
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="logo"
              className={`${path === "/" ? "hidden" : ""} w-24`}
            />
          </Link>
          <HamburgerButton />
        </div>
        {path.includes("/profile") ? (
          <div
            className={`z-10 h-screen w-full flex flex-col bg-white justify-center items-center gap-4 duration-300 ${!isOpenBurger ? "translate-x-[100vw] " : "translate-x-0"
              }`}
          >
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpenBurger(false)}
              >
                <div
                  className={`flex gap-2 w-full items-center px-2 py-3 rounded-md ${path === item.path ? "bg-[#F6F8FA]" : ""
                    }`}
                >
                  <BaseIcon
                    name={item.icon}
                    width={24}
                    height={24}
                    color={path === item.path ? "#0055FB" : "#424A53"}
                  />
                  <p
                    className={`${path === item.path ? "text-[#0055FB]" : "text-[#424A53]"
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
            className={`z-10 h-screen w-full flex flex-col bg-gradient-to-b from-[#18324D] to-[#3874B3] justify-center items-center gap-16 duration-300 ${!isOpenBurger ? "translate-x-[100vw]" : "translate-x-0"
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
                <Image
                  src={Russia}
                  alt="Russia flag"
                  width={20}
                  height={20}
                />
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
