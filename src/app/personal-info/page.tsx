"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import Image from "next/image";
import React, { useState } from "react";
import user from "../../../public/assets/user-profile.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/datePicker/DatePicker";
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
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import bigLogo from "../../../public/assets/big_logo.svg";

const schema = z.object({
  lastname: z.string().min(3, "lastname is required"),
  name: z.string().min(3, "name is required"),
  fathername: z.string().min(3, "fathername is required"),
  birthdate: z.date().min(new Date(1900, 0, 1), "birthdate is required"),
  idnumber: z
    .string()
    .regex(
      /^[A-Za-z]{2}\d{7}$/,
      "Invalid format. Expected format: 2 letters followed by 7 digits"
    ),
  jshshir: z
    .string()
    .regex(/^\d{14}$/, "Invalid format. Expected format: 14 digits"),
  gender: z.string().min(3, "Gender is required"),
  citizenship: z.string().min(3, "citizenship be at least 18"),
  region: z.string().min(3, "region is required"),
  phone: z.string().min(3, "phone is required"),
  additionaphone: z.string().min(3, "additionaphone is required"),
});

type FormData = z.infer<typeof schema>;

const PersonalInfo = () => {
  const [image, setImage] = useState<any>("");
  const [personalInfo, setPersonalInfo] = useLocalStorage("personalInfo", {});
  const router = useRouter();

  function handleSetImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...personalInfo,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setPersonalInfo(data);
    router.push("/education-info");
  };

  return (
    <SEO>
      <FormLayout>
        <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl relative">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
            Shaxsiy ma’lumotlar
          </h2>
          <label htmlFor="imageUpload">
            <div className="bg-[#F6F8FA] mb-8 w-40 h-40 flex items-center justify-center rounded-full shadow border border-[#EAEEF2] cursor-pointer overflow-hidden object-cover object-center">
              <Image
                src={image ? URL.createObjectURL(image) : user}
                alt={"some image"}
                width={image ? 160 : 100}
                height={image ? 160 : 100}
              />
            </div>
          </label>

          <input
            id="imageUpload"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            type="file"
            onChange={(e) => handleSetImage(e)}
          />

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6 ">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="lastname"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Familiyangiz
                  </label>
                  <Input
                    id="lastname"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder="Familiyangizni kiriting"
                    {...form.register("lastname")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.lastname?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="name"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Ismingiz
                  </label>
                  <Input
                    id="name"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder="Ismingizni kiriting"
                    {...form.register("name")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.name?.message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="fathername"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Otangizni ismi
                  </label>
                  <Input
                    id="fathername"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder="Otangizni ismi"
                    {...form.register("fathername")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.fathername?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="birthdate"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Tug`ilgan sanangiz
                  </label>
                  <Controller
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <DatePicker {...field} className="border-none" />
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.birthdate?.message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="idnumber"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Passport / ID seriya va raqami
                  </label>
                  <Input
                    id="idnumber"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53] uppercase"
                    placeholder="Passport / ID seriya va raqami"
                    {...form.register("idnumber")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.idnumber?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="jshshir"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    JSHSHIR
                  </label>
                  <Input
                    id="jshshir"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder="JSHSHIR"
                    {...form.register("jshshir")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.jshshir?.message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-6 mb-12">
                <div className="flex-1">
                  <div className="mb-6">
                    <label
                      htmlFor="gender"
                      className="text-[#424A53] font-medium text-sm"
                    >
                      Jinsingiz
                    </label>

                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                            <SelectValue
                              id="gender"
                              placeholder="Select a gender"
                              className="!text-[#9ca3af]"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                value="male"
                                className="!text-[#424A53] cursor-pointer"
                              >
                                Male
                              </SelectItem>
                              <SelectItem
                                value="Female"
                                className="!text-[#424A53] cursor-pointer"
                              >
                                Female
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <span className="text-red-400 text-xs">
                      {form.formState.errors.gender?.message}
                    </span>
                  </div>
                  <label
                    htmlFor="region"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Tug’ilgan joy
                  </label>
                  {/* <Input
                  id="region"
                  className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                  placeholder="Tug’ilgan joyingizni kiriting"
                  {...register("region")}
                /> */}

                  <Controller
                    name="region"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                          <SelectValue
                            placeholder="Tug`ilgan joyingizni kiriting"
                            className="!text-[#9ca3af]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="chilonzor"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              Chilonzor
                            </SelectItem>
                            <SelectItem
                              value="mirobod"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              Mirobod
                            </SelectItem>{" "}
                            <SelectItem
                              value="yunusobod"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              Yunusobod
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.region?.message}
                  </span>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="citizenship"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Fuqarolik
                  </label>
                  {/* <Input
                  id="citizenship"
                  className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                  placeholder="Fuqaroligingiz"
                  {...register("citizenship")}
                /> */}

                  <Controller
                    name="citizenship"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                          <SelectValue
                            placeholder="Fuqaroligingiz"
                            className="!text-[#9ca3af]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value="uzbekistan"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              O`zbekiston
                            </SelectItem>
                            <SelectItem
                              value="usa"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              USA
                            </SelectItem>
                            <SelectItem
                              value="ksa"
                              className="!text-[#424A53] cursor-pointer"
                            >
                              KSA
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.citizenship?.message}
                  </span>
                </div>
              </div>

              <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
                Bog`lanish uchun ma`lumotlar
              </h2>

              <div className="flex flex-col sm:flex-row  justify-between items-center gap-6 mb-12">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="phone"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Shaxsiy telefon raqamingiz
                  </label>
                  <Input
                    id="phone"
                    className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                    placeholder="998xx xxx-xx-xx"
                    {...form.register("phone")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.phone?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="additionaphone"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Qo’shimcha raqam
                  </label>
                  <Input
                    id="additionaphone"
                    className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781]"
                    placeholder="998xx xxx-xx-xx"
                    {...form.register("additionaphone")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.additionaphone?.message}
                  </span>
                </div>
              </div>

              <Button className="!bg-[#18324D] w-full !py-[14px] h-auto">
                Davom etish
              </Button>
            </Form>
          </form>

          <Image
            src={bigLogo}
            alt="big logo"
            className="hidden md:block absolute top-10 right-20"
            width={500}
            height={184}
          />
        </div>
      </FormLayout>
    </SEO>
  );
};

export default PersonalInfo;
