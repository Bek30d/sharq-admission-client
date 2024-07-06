"use client";

import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import user from "../../../../public/assets/user-profile.png";
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
import bigLogo from "../../../../public/assets/big_logo.svg";
import {
  formatDate,
  formatPassportField,
  unformatPassportField,
} from "@/lib/utils";
import { formStore } from "@/store/form.store";
import BaseIcon from "@/components/icons/BaseIcon";
import withAuth from "@/components/with-auth/WithAuth";
import { Toaster } from "react-hot-toast";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { userStore } from "@/store/main.store";

const schema = z.object({
  last_name: z.string({
    required_error: "Familiyangizni kiriting",
  }),
  first_name: z.string({
    required_error: "Ismingizni kiriting",
  }),
  fathers_name: z.string({
    required_error: "Otangizni ismini kiriting",
  }),
  birthday: z
    .string()
    .regex(/^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
      message: "Birthdate must be in the format YYYY-MM-DD and valid",
    }),
  passport_number: z
    .string({
      required_error: "Pasport raqamingiz",
    })
    .regex(
      /^[A-Za-z]{2}\d{7}$/,
      "Invalid format. Expected format: 2 letters followed by 7 digits"
    ),
  jshshir: z
    .string({
      required_error: "JSHSHIR",
    })
    .regex(/^\d{14}$/, "Invalid format. Expected format: 14 digits"),
  gender: z.string({
    required_error: "Jinsingizni tanlang",
  }),
  country_id: z.string({
    required_error: "Fuqaroligingiz tanlang",
  }),
  region_id: z.string({
    required_error: "Tug'ilgan viloyatingizni tanlang",
  }),
  phone: z.string({
    required_error: "Telefon raqamingizni kiriting",
  }),
  additionaphone: z.string({
    required_error: "Telefon raqamingizni kiriting",
  }),
});

type FormData = z.infer<typeof schema>;

type PersonalInfo = {
  last_name: string;
  first_name: string;
  fathers_name: string;
  birthday: string;
  passport_number: string;
  jshshir: string;
  gender: string;
  country_id: string;
  region_id: string;
  phone: string;
  additionaphone: string;
};

const PersonalInfo = () => {
  const router = useRouter();
  const t = useTranslations("PersonalInfo");
  const {
    isLoading,
    aboutMe,
    fileUpload,
    getCountries,
    countries,
    getRegions,
    regions,
  } = formStore();
  const [image, setImage] = useState<any>("");
  const [imageId, setImageId] = useState<string>("");
  const { getMyData } = userStore()
  const [personalInfo, setPersonalInfo] = useLocalStorage<PersonalInfo>(
    "userData",
    {
      last_name: "",
      first_name: "",
      fathers_name: "",
      birthday: "",
      passport_number: "",
      jshshir: "",
      gender: "",
      country_id: "",
      region_id: "",
      phone: "",
      additionaphone: "",
    }
  );
  const [_, setIsAccessEdu] = useLocalStorage("isAccessEdu", false);
  const [customDisplayValue, setCustomDisplayValue] = useState(() => {
    if (personalInfo.passport_number) {
      return formatPassportField(personalInfo.passport_number);
    }
  });
  const [birthdate, setBirthdate] = useState(() => {
    if (personalInfo?.birthday) {
      return formatDate(personalInfo?.birthday);
    } else {
      return "";
    }
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...personalInfo,
      birthday: birthdate,
      country_id: `${personalInfo.country_id}`,
    },
  });

  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length > 8) value = value.slice(0, 8); // Limit to 8 digits

    const formattedValue = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    setBirthdate(formattedValue);

    form.setValue("birthday", formattedValue);
  };

  async function handleSetImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      const res = await fileUpload(formdata);

      res.success ? setImageId(res.data.id) : null;
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isLoading) {
      const res = await aboutMe({
        ...data,
        birthday: formatDate(data.birthday),
        image_id: imageId,
      });

      if (res.success) {
        setPersonalInfo({ ...data, birthday: formatDate(data.birthday) });
        setIsAccessEdu(true);
        router.push("/education-info");
      }
    }
  };

  useEffect(() => {
    getRegions();
    getCountries();
    getMyData();
  }, []);

  return (
    <SEO>
      <FormLayout>
        <Toaster />
        <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl relative">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
            {t("title")}
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
                    {t("last_name")}
                  </label>
                  <Input
                    id="lastname"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder={t("enter_your_last_name")}
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
                    {t("first_name")}
                  </label>
                  <Input
                    id="name"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder={t("enter_your_first_name")}
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
                    {t("father_name")}
                  </label>
                  <Input
                    id="fathername"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder={t("enter_your_father_name")}
                    {...form.register("fathers_name")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.fathers_name?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="birthday"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("birthday")}
                  </label>
                  <div className="relative">
                    <BaseIcon
                      name="calendar"
                      cn="absolute !right-4 top-1/2 tranform -translate-y-1/2"
                      color="#424A53"
                    />
                    <Input
                      id="birthday"
                      className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                      placeholder="yyyy-mm-dd"
                      value={birthdate}
                      onChange={handleBirthdateChange}
                    />
                  </div>
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.birthday?.message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="passport_number"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("passport_number")}
                  </label>
                  <Input
                    id="passport_number"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53] uppercase"
                    placeholder={t("passport_number")}
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
                    {t("jshshir")}
                  </label>
                  <Input
                    id="jshshir"
                    className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                    placeholder={t("jshshir")}
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
                      {t("gender")}
                    </label>

                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                            <SelectValue
                              id="gender"
                              placeholder={t("enter_your_gender")}
                              className="!text-[#9ca3af]"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                value="male"
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {t("male")}
                              </SelectItem>
                              <SelectItem
                                value="female"
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {t("female")}
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
                    htmlFor="region_id"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("address")}
                  </label>

                  <Controller
                    name="region_id"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                          <SelectValue
                            id="region_id"
                            placeholder={t("enter_your_address")}
                            className="!text-[#9ca3af]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {regions.map((region) => (
                              <SelectItem
                                key={region.id}
                                value={`${region.id}`}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {region.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
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
                    {t("citizenship")}
                  </label>

                  <Controller
                    name="country_id"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-auto border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]">
                          <SelectValue
                            placeholder={t("citizenship")}
                            className="!text-[#9ca3af]"
                          >
                            {form.getValues("country_id")
                              ? countries.find(
                                (country) =>
                                  `${country.id}` ==
                                  form.getValues("country_id")
                              )?.name
                              : ""}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countries.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id}`}
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
                {t("title_2")}
              </h2>

              <div className="flex flex-col sm:flex-row  justify-between items-center gap-6 mb-12">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="phone"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("phone_number")}
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
                    {t("additional_phone_number")}
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
                className={`${!isLoading ? "!bg-[#18324D]" : "!bg-[#18324d83]"
                  } w-full !py-[14px] h-auto`}
              >
                {t("submit")}
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

export default withAuth(PersonalInfo);
