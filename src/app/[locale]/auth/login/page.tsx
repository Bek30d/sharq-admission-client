"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "@/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  password: z.string().min(3, "Password is required"),
});

const Login = () => {
  let initialTime = 60;
  const [time, setTime] = useState(initialTime);
  const { phone, login, postPhone, isLoading } = useAuthStore();
  const router = useRouter();
  const circumference = 2 * Math.PI * 15;
  const offset = circumference - (time / initialTime) * circumference;
  const t = useTranslations("Auth");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await login(data.password);
    response === 1 ? router.push("/auth/verify") : toast.error("Xatolik yuz berdi");
  };

  const handleResend = async () => {
    const response = await postPhone(phone);
    if (response === 1) {
      toast.success("Kod qayta yuborildi.");
      setTime(initialTime);
      startTimer();
    } else {
      toast.error("Xatolik yuz berdi");
    }
  };

  useEffect(() => {
    startTimer();

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  let timerInterval: any;

  const startTimer = () => {
    clearInterval(timerInterval); // Clear any existing interval
    timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  return (
    <Wrapper
      title={t("title")}
      description={
        <span>
          <span className="text-[#0055FB]">{phone} </span>
          {t("login")}
        </span>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="flex flex-col md:space-y-10 space-y-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="phone"
                className="text-[#424A53] font-medium text-sm"
              >
                <div className="flex justify-between items-center">
                  <p>{t("phone_number")}</p>
                  <Button
                    className="!text-[#0055FB] p-0"
                    variant={"link"}
                    onClick={() => router.back()}
                  >
                    {t('change_phone_number')}
                  </Button>
                </div>
              </label>
              <Input
                disabled
                value={phone}
                id="phone"
                type="tel"
                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                placeholder="998xx xxx-xx-xx"
              />
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="password"
                className="text-[#424A53] font-medium text-sm"
              >
                {t("password")}
              </label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781]"
                  placeholder={t("password_placeholder")}
                  {...form.register("password")}
                />
                {time ? (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-sm text-[#18324D]">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      className="-rotate-90"
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
                ) : null}
              </div>
              <span className="text-red-400 text-xs">
                {form.formState.errors.password?.message}
              </span>
            </div>
            <button
              type="button"
              disabled={time !== 0}
              className="text-[#18324D] font-medium text-center disabled:text-[#6E7781] disabled:cursor-not-allowed"
              onClick={handleResend}
            >
              {t("resend_password")}
            </button>
            <Button
              className={`${!isLoading ? "!bg-[#18324D]" : "!bg-[#18324d83]"
                } w-full !py-[14px] h-auto`}
            >
              {t("continue")}
            </Button>
          </div>
        </Form>
      </form>
    </Wrapper>
  );
};

export default Login;
