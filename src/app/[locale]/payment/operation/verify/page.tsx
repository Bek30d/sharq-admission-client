"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OperationLayout from "@/layouts/OperationLayout";
import PaymentLayout from "@/layouts/PaymentLayout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Wrapper from "../../Wrapper";
import PaymentDetailsCard from "../PaymentDetailsCard";

const Verify = () => {
  const initialTime = 5;
  const [time, setTime] = useState(initialTime);
  const circumference = 2 * Math.PI * 15;
  const offset = circumference - (time / initialTime) * circumference;
  const router = useRouter();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <PaymentLayout>
      <Wrapper title="To’lov cheki">
        <div className="flex gap-12 md:flex-row flex-col">
          <PaymentDetailsCard />
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-[#18324D] font-medium">Nomerni tasdiqlash</p>
            <div className="w-full">
              <label
                htmlFor="password"
                className="text-[#424A53] font-medium text-sm"
              >
                Tasdiqlash kodi
              </label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  className="border-[#D0D7DE] bg-[#F0F2F5] outline-none !py-4 !px-3 text-[#24292F] text-lg font-medium placeholder:text-[#6E7781] "
                  placeholder="Enter the code"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm text-[#18324D]">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    className="-rotate-[90deg]"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      stroke="#1CB854"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                    />
                  </svg>
                  <span className="absolute">{time}</span>
                </div>
              </div>
            </div>
            <button
              disabled={time !== 0}
              className="text-[#18324D] font-medium text-center disabled:text-[#6E7781] disabled:cursor-not-allowed"
            >
              Qayta yuborish
            </button>
            <p className="text-center">
              Tasdiqlash kodi +998 93 *** ** 15 <br />
              yuborildi
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => router.back()}
                className="w-full !bg-white !text-[#0550AE] border border-[#0550AE]"
              >
                Orqaga
              </Button>
              <Button
                type="submit"
                className="!bg-[#18324D] w-full !py-[10px] h-auto"
                onClick={() => router.push("/")}
              >
                Jo’natish
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </PaymentLayout>
  );
};

export default Verify;
