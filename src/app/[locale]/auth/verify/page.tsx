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
import {
  formatPassportField,
  unformatDate,
  unformatPassportField,
} from "@/lib/utils";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  passport: z.string().min(3, "Passport data is required"),
  birthDate: z.string().min(3, "Birth date is required"),
});

const Verify = () => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [customDisplayValue, setCustomDisplayValue] = useState<string>("");
  const { postPassport, isLoading, isLoggedId } = useAuthStore();
  const t = useTranslations("Auth");
  const router = useRouter();

  const formatDate = (value: string) => {
    const cleanedValue = value.replace(/\D+/g, ""); // Remove all non-digit characters
    const year = cleanedValue.slice(0, 4);
    const month = cleanedValue.slice(4, 6);
    const day = cleanedValue.slice(6);

    let formattedValue = year;
    if (month) formattedValue += ` - ${month}`;
    if (day) formattedValue += ` - ${day}`;

    return formattedValue;
  };

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthDate: "",
      passport: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await postPassport(data.passport, data.birthDate);
    response === 1 ? router.push("/personal-info") : toast.error("Xatolik yuz berdi");
  };

  useEffect(() => {
    if (!isLoggedId) {
      router.push("/auth");
    }
  }, []);

  return (
    <Wrapper
      title={t('verify_title')}
      description={t('verify')}
    >
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <div className="flex flex-col md:space-y-10 space-y-6">
            <div className="flex-1 w-full">
              <label
                htmlFor="passport"
                className="text-[#424A53] font-medium text-sm"
              >
                {t('passport_or_id')}
              </label>
              <Input
                id="passport"
                name="passport_ID"
                type="text"
                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                value={customDisplayValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const formattedValue = formatPassportField(inputValue);
                  setCustomDisplayValue(formattedValue);
                  form.setValue("passport", unformatPassportField(inputValue));
                }}
                placeholder="__ _______"
              />
              <span className="text-red-400 text-xs">
                {form.formState.errors.passport?.message}
              </span>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="password"
                className="text-[#424A53] font-medium text-sm"
              >
                {t('date_of_birth')}
              </label>
              <Input
                id="password"
                type="text"
                className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                placeholder="yyyy - mm - dd"
                value={displayValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const formattedValue = formatDate(inputValue);
                  setDisplayValue(formattedValue);
                  form.setValue("birthDate", unformatDate(inputValue));
                }}
              />
              <span className="text-red-400 text-xs">
                {form.formState.errors.birthDate?.message}
              </span>
            </div>
            <Button
              className={`${!isLoading ? "!bg-[#18324D]" : "!bg-[#18324d83]"
                } w-full !py-[14px] h-auto`}
            >
              {t('submit')}
            </Button>
          </div>
        </Form>
      </form>
    </Wrapper>
  );
};

export default Verify;
