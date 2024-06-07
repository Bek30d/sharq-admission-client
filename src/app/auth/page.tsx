"use client";
import React from "react";
import Wrapper from "./Wrapper";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

type FormData = z.infer<typeof schema>;
const phoneRegex = new RegExp(/^\+998\d{9}$/);

const schema = z.object({
  phone: z.string().regex(phoneRegex, { message: "Invalid phone number" }),
});

const Auth = () => {
  const router = useRouter();
  const { postPhone } = useAuthStore();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "+998",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await postPhone(data.phone);
    response === 1 ? router.push("/auth/login") : alert("Xatolik yuz berdi");
  };

  return (
    <Wrapper
      title="2024-2025-o‘quv yili uchun ariza topshirish"
      description="Ro’yhatdan o’tish yoki tizimga kirish uchun
telefon raqamingizni kiriting."
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="flex flex-col md:space-y-10 space-y-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="phone"
                className="text-[#424A53] font-medium text-sm"
              >
                Telefon raqam
              </label>
              <Input
                id="phone"
                type="tel"
                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                placeholder="998xx xxx-xx-xx"
                {...form.register("phone")}
              />
              <span className="text-red-400 text-xs">
                {form.formState.errors.phone?.message}
              </span>
            </div>
            <Button className="!bg-[#18324D] w-full !py-[14px] h-auto">
              Davom etish
            </Button>
          </div>
        </Form>
      </form>
    </Wrapper>
  );
};

export default Auth;
