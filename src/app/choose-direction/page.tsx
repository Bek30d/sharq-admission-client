"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { formStore } from "@/store/form.store";
import { userStore } from "@/store/main.store";
import Done from "@/components/done/Done";
import withAuth from "@/components/with-auth/WithAuth";

const schema = z.object({
  degree: z.string({
    invalid_type_error: "Invalid name",
    required_error: "Ta'lim darajani tanlash majburiy",
  }),
  faculty: z.string({
    invalid_type_error: "Invalid name",
    required_error: "Fakultetni tanlash majburiy",
  }),
  edu_direction: z.string({
    invalid_type_error: "Invalid name",
    required_error: "Ta'lim yo'nalishini tanlash majburiy",
  }),
  education_form: z.string({
    invalid_type_error: "Invalid name",
    required_error: "Ta'lim shaklini tanlash majburiy",
  }),
  edu_lang: z.string({
    invalid_type_error: "Invalid name",
    required_error: "Ta'lim tilini tanlash majburiy",
  }),
});

type FormData = z.infer<typeof schema>;

const degrees = [
  {
    value: "bachelor",
    label: "Bakalavr",
  },
  {
    value: "master",
    label: "Magistr",
  },
];

export const directions = [
  {
    value: "moliya",
    label: "Moliya",
  },
  {
    value: "kafedra",
    label: "Kafedra",
  },
  {
    value: "muhandis",
    label: "Muhandis",
  },
];

const education_types = [
  {
    value: "day",
    label: "Kunduzgi",
  },
  {
    value: "evening",
    label: "Kechgi",
  },
  {
    value: "extramural",
    label: "Sirtqi",
  },
  {
    value: "remote",
    label: "Onlayn",
  },
];

const education_lang = [
  {
    value: "en",
    label: "Englizcha",
  },
  {
    value: "ru",
    label: "Ruscha",
  },
  {
    value: "uz",
    label: "O'zbekcha",
  },
];

const ChooseDirection = () => {
  const { user } = userStore();
  const { chooseDirection, isLoading } = formStore();
  const [isReliable, setIsReliable] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [id, setId] = useState<number>(0);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // ...directionInfo,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await chooseDirection(user.id, {
      ...data,
      faculty: "bachelor",
      is_confirmed: isReliable,
    });

    setId(result.data.data.id);
    result.success ? setIsDone(true) : setIsDone(false);
  };

  return (
    <SEO>
      {isDone ? (
        <Done id={id} />
      ) : (
        <FormLayout>
          <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
              Yo’nalishni tanlash
            </h2>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Form {...form}>
                <div className="mb-6 w-full">
                  <label
                    htmlFor="college"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Daraja
                  </label>

                  <Controller
                    name="degree"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="degree"
                            placeholder="Darajani tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {degrees.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.degree?.message}
                  </span>
                </div>
                <div className="mb-6 w-full">
                  <label
                    htmlFor="edu_direction"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Yo’nalish yoki mutaxxassislik
                  </label>

                  <Controller
                    name="edu_direction"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="edu_direction"
                            placeholder="Yo'nalishni tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {directions.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.edu_direction?.message}
                  </span>
                </div>
                <div className="mb-6 w-full">
                  <label
                    htmlFor="college"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Fakultet
                  </label>

                  <Controller
                    name="faculty"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="faculty"
                            placeholder="Darajani tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {degrees.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.degree?.message}
                  </span>
                </div>
                <div className="mb-6 w-full">
                  <label
                    htmlFor="education_form"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Ta’lim shakli
                  </label>

                  <Controller
                    name="education_form"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="education_form"
                            placeholder="Ta'lim turini tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {education_types.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.education_form?.message}
                  </span>
                </div>
                <div className="mb-6 w-full">
                  <label
                    htmlFor="education_lang"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Ta’lim tili
                  </label>

                  <Controller
                    name="edu_lang"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="edu_lang"
                            placeholder="Ta'lim tilini tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {education_lang.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.edu_lang?.message}
                  </span>
                </div>

                <div className="flex gap-2 mb-10">
                  <Checkbox
                    id="honors_degree"
                    onCheckedChange={() => setIsReliable(!isReliable)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="honors_degree"
                    className="text-[#444444] font-light text-sm"
                  >
                    Arizadagi barcha ma’lumotlarni o‘z qo‘lim bilan to‘ldirdim,
                    ma’lumotlarim to‘g‘riligiga kafolat beraman. Agar men o‘zim
                    haqimda noto‘g‘ri yoki yolg‘on ma’lumotlar kiritgan bo‘lsam,
                    oliygoh qabul bo‘limi mening arizamni rad etishga haqli
                    ekanligini bilaman.
                  </label>
                </div>

                <div className="flex justify-between items-center bg-[#F6F8FA] p-4 rounded-2xl mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EAEEF2]">
                      <BaseIcon name="payment_time" />
                    </div>

                    <div>
                      <h3 className="text-[#424A53] font-semibold text-xl">
                        To’ovni amalga oshirish
                      </h3>
                      <p className="text-[#57606A] text-sm">
                        Belgilangan to’lov miqdori{" "}
                        <span className="text-[#424A53] font-medium italic">
                          115 000 uzs
                        </span>
                      </p>
                    </div>
                  </div>

                  <BaseIcon name="arrowRight" />
                </div>

                {isReliable || isLoading ? (
                  <Button
                    type="submit"
                    className="!bg-[#18324D] w-full !py-[14px] h-auto"
                  >
                    Jo’natish
                  </Button>
                ) : (
                  <Button className="!bg-[#18324d83] w-full !py-[14px] h-auto !cursor-auto">
                    Jo’natish
                  </Button>
                )}
              </Form>
            </form>
          </div>
        </FormLayout>
      )}
    </SEO>
  );
};

export default withAuth(ChooseDirection);
