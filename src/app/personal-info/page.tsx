"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import user from "../../../public/assets/user-profile.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { personalInfoStore } from "@/store/personal-info.store";
import { formatPassportField, unformatPassportField } from "@/lib/utils";
import { DatePicker } from "@/components/datePicker/DatePicker";

const schema = z.object({
  last_name: z.string().min(3, "lastname is required"),
  first_name: z.string().min(3, "name is required"),
  fathers_name: z.string().min(3, "fathername is required"),
  birthday: z.date().min(new Date(1900, 0, 1), "birthdate is required"),
  passport_number: z
    .string()
    .regex(
      /^[A-Za-z]{2}\d{7}$/,
      "Invalid format. Expected format: 2 letters followed by 7 digits"
    ),
  jshshir: z
    .string()
    .regex(/^\d{14}$/, "Invalid format. Expected format: 14 digits"),
  gender: z.string().min(3, "Gender is required"),
  country_id: z.string().min(3, "citizenship be at least 18"),
  region_id: z.string(),
  phone: z.string().min(3, "phone is required"),
  additionaphone: z.string().min(3, "additionaphone is required"),
});

type FormData = z.infer<typeof schema>;

const PersonalInfo = () => {
  const { isLoading, aboutMe, fileUpload, getRegions, regions } =
    personalInfoStore();
  const [image, setImage] = useState<any>("");
  const [imageId, setImageId] = useState<string>("");
  const [personalInfo, setPersonalInfo] = useLocalStorage("userData", {});
  const [customDisplayValue, setCustomDisplayValue] = useState<string>("");
  const router = useRouter();

  async function handleSetImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      const res = await fileUpload(formdata);

      res.success ? setImageId(res.data.id) : null;
    }
  }

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...personalInfo,
    },
  });

  const countries = [
    {
      id: 1,
      name: "Uzbekistan",
    },
    {
      id: 2,
      name: "Russia",
    },
    {
      id: 3,
      name: "United Kingdom",
    },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isLoading) {
      console.log(data);

      const formattedBirthday = new Date(data.birthday)
        .toISOString()
        .split("T")[0];

      setPersonalInfo(data);

      const res = await aboutMe({
        ...data,
        birthday: formattedBirthday,
        region_id: regions.find((region) => region.name === data.region_id).id,
        image_id: imageId,
        country_id: countries.find(
          (country) => country.name === data.country_id
        )?.id,
      });

      if (res.success) {
        router.push("/education-info");
      }
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  return (
    <SEO>
      <FormLayout>
        <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl relative">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
            Shaxsiy ma’lumotlar
          </h2>
          <div className="bg-[#F6F8FA] mb-8 w-40 h-40 flex items-center justify-center rounded-full shadow border border-[#EAEEF2] cursor-pointer overflow-hidden object-cover object-center">
            <label htmlFor="imageUpload">
              <Image
                src={image ? URL.createObjectURL(image) : user}
                alt={"some image"}
                width={image ? 160 : 100}
                height={image ? 160 : 100}
              />
            </label>
          </div>

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
                    {...form.register("last_name")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.last_name?.message}
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
                    {...form.register("first_name")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.first_name?.message}
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
                    {...form.register("fathers_name")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.fathers_name?.message}
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
                    name="birthday"
                    render={({ field }) => (
                      <DatePicker {...field} className="border-none" />
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.birthday?.message}
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
                    value={customDisplayValue}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const formattedValue = formatPassportField(inputValue);
                      setCustomDisplayValue(formattedValue);
                      form.setValue(
                        "passport_number",
                        unformatPassportField(inputValue)
                      );
                    }}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.passport_number?.message}
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

                  <Controller
                    name="region_id"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                            <SelectValue
                              placeholder="Tug`ilgan joyingizni kiriting"
                              className="!text-[#9ca3af]"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {regions.map((region) => (
                                <SelectItem
                                  key={region.id}
                                  value={region.name}
                                  className="!text-[#424A53] cursor-pointer"
                                >
                                  {region.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />

                  <span className="text-red-400 text-xs">
                    {form.formState.errors.region_id?.message}
                  </span>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="citizenship"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Fuqarolik
                  </label>

                  <Controller
                    name="country_id"
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
                            {countries.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.name}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.country_id?.message}
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

              <Button
                className={`${
                  !isLoading ? "!bg-[#18324D]" : "!bg-[#18324d83]"
                } w-full !py-[14px] h-auto`}
              >
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
