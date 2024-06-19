"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import React, { useEffect, useState } from "react";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formStore } from "@/store/form.store";
import { userStore } from "@/store/main.store";
import withAuth from "@/components/with-auth/WithAuth";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

const schema = z.object({
  edu_type: z.string({
    required_error: "Bu maydonni to'ldiring",
  }),
  entered_year: z.string({
    required_error: "Bu maydonni to'ldiring",
  }),
  graduation_year: z.string({
    required_error: "Bu maydonni to'ldiring",
  }),
  region_id: z.string({
    required_error: "Viloyatni tanlang",
  }),
  district_id: z.string({
    required_error: "Tumanni tanlang",
  }),
  education_name: z
    .string({
      required_error: "Bu maydonni to'ldiring",
    })
    .min(3, "Kamida 3 ta harf bo'lishi kerak"),
  certificate_name: z
    .string({
      required_error: "Bu maydonni to'ldiring",
    })
    .min(3, "Kamida 3 ta harf bo'lishi kerak"),
  is_cert_privileged: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const collageItems = [
  {
    value: "medical",
    label: "2ND REPUBLICAN MEDICAL COLLEGE.",
  },
  {
    value: "engineering",
    label: "ALMAZAR COLLEGE OF LIGHT INDUSTRY",
  },
  {
    value: "pedagok",
    label: "CHILANZAR PEDAGOGICAL COLLEGE",
  },
  {
    value: "other",
    label: "OTHER",
  },
];

const certificates = [
  {
    id: "1",
    label: "IELTS",
  },
  {
    id: "2",
    label: "TOEFL",
  },
  {
    id: "3",
    label: "GRE",
  },
  {
    id: "4",
    label: "GMAT",
  },
];

const EducationInfo = () => {
  const { user } = userStore();
  const { isLoading, updateEduInfo, regions, getRegions, fileUpload } =
    formStore();
  const [hasLanguageDegree, setHasLanguageDegree] = useState(false);
  const [degreeFile, setDegreeFile] = useState<any>(null);
  const [certificatId, setCertificateId] = useState<string>("");
  const [districts, setDistricts] = useState([]);
  const [certificateFile, setCertificateFile] = useState<any>(null);
  const [langCertificate, setLangCertificate] = useState<any>(null);
  const [langCertificateId, setLangCertificateId] = useState<string>("");
  const [_, setIsAccessChooseDir] = useLocalStorage("isAccessChooseDir", false);
  const router = useRouter();
  const t = useTranslations("EducationInfo");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await updateEduInfo({
      ...data,
      user_id: user.id,
      entered_year: new Date(data.entered_year).toISOString().split("T")[0],
      graduation_year: new Date(data.graduation_year)
        .toISOString()
        .split("T")[0],
      region_id: `${
        regions.find((region) => region.name === data.region_id).id
      }`,
      district_id: `${
        districts.find((district) => district?.name === data.district_id).id
      }`,
      graduation_cert_id: certificatId,
      is_cert_privileged: data.is_cert_privileged
        ? data.is_cert_privileged
        : false,
      language_cert_id: langCertificateId,
      language_cert_type: langCertificate,
      is_cert_existed: hasLanguageDegree,
    });

    if (result.success) {
      router.push("/choose-direction");
      setIsAccessChooseDir(true);
    }
  };

  async function handleSetDegreeFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files && event.target.files.length > 0) {
      setDegreeFile(event.target.files[0]);
      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      const res = await fileUpload(formdata);

      res.success ? setCertificateId(res.data.id) : null;
    }
  }

  async function handleSetCertificateFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files && event.target.files.length > 0) {
      setCertificateFile(event.target.files[0]);

      let formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      const res = await fileUpload(formdata);

      res.success ? setLangCertificateId(res.data.id) : null;
    }
  }

  useEffect(() => {
    getRegions();
  }, []);

  const years = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024,
  ];

  return (
    <SEO>
      <FormLayout>
        <Toaster />
        <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
            {t("title")}
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
              <div className="mb-6 w-full">
                <label
                  htmlFor="college"
                  className="text-[#424A53] font-medium text-sm"
                >
                  {t("collage_label")}
                </label>

                <Controller
                  name="edu_type"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                        <SelectValue
                          id="edu_type"
                          placeholder={t("collage")}
                          className=" placeholder:!text-[#6E7781]"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {collageItems.map((item) => (
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
                  {form.formState.errors.edu_type?.message}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="year_of_entiring_college"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("entered_year_label")}
                  </label>
                  <Controller
                    name="entered_year"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="!border border-[#D0D7DE] !bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="entered_year"
                            placeholder={t("entered_year")}
                            className="!text-[#9ca3af]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {years.reverse().map((item) => (
                              <SelectItem
                                key={item}
                                value={`${item}`}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.entered_year?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="graduation_year"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("graduation_year_label")}
                  </label>

                  <Controller
                    name="graduation_year"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="!border border-[#D0D7DE] !bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="graduation_year"
                            placeholder={t("entered_year")}
                            className="!text-[#9ca3af]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {years.reverse().map((item) => (
                              <SelectItem
                                key={item}
                                value={`${item}`}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.graduation_year?.message}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="region"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    {t("collage_region_address")}
                  </label>
                  <Controller
                    name="region_id"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setDistricts(
                            regions.find((item) => item.name === value)
                              .districts
                          );
                        }}
                      >
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="region_id"
                            placeholder={t("select_region")}
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {regions.map((item) => (
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
                    {form.formState.errors.region_id?.message}
                  </span>
                </div>
                {districts.length ? (
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="district"
                      className="text-[#424A53] font-medium text-sm"
                    >
                      {t("collage_district_address")}
                    </label>
                    <Controller
                      name="district_id"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781] disabled">
                            <SelectValue
                              id="district_id"
                              placeholder={t("select_district")}
                              className=" placeholder:!text-[#6E7781]"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {districts?.map(
                                (item: { id: number; name: string }) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.name}
                                    className="!text-[#424A53] cursor-pointer"
                                  >
                                    {item.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <span className="text-red-400 text-xs">
                      {form.formState.errors.district_id?.message}
                    </span>
                  </div>
                ) : (
                  <div className="flex-1 w-full">
                    <label
                      htmlFor="district"
                      className="text-[#424A53] font-medium text-sm"
                    >
                      {t("collage_district_address")}
                    </label>
                    <Controller
                      name="district_id"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781] cursor-auto">
                            <SelectValue
                              id="district_id"
                              placeholder={t("select_district")}
                              className=" placeholder:!text-[#6E7781]"
                            />
                          </SelectTrigger>
                        </Select>
                      )}
                    />
                    <span className="text-red-400 text-xs">
                      {form.formState.errors.district_id?.message}
                    </span>
                  </div>
                )}
              </div>

              <div className="w-full mb-6">
                <label
                  htmlFor="collage_name"
                  className="text-[#424A53] font-medium text-sm"
                >
                  {t("collage_name")}
                </label>
                <Input
                  id="collage_name"
                  className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                  placeholder={t("collage_name")}
                  {...form.register("education_name")}
                />
                <span className="text-red-400 text-xs">
                  {form.formState.errors.education_name?.message}
                </span>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="collage_name"
                  className="text-[#424A53] font-medium text-sm"
                >
                  {t("diploma_name")}
                </label>

                <div className="flex gap-2 items-center">
                  <Input
                    className="!border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                    placeholder={t("diploma_name")}
                    id="degree_name"
                    value={degreeFile?.name}
                    disabled
                  />
                  <label htmlFor="degreeFile">
                    <div className="h-max border !border-[#0969DA] !bg-transparent flex gap-1.5 items-center py-3 px-5 rounded-lg cursor-pointer">
                      <BaseIcon name="upload" color="#0969DA" />
                      <span className="text-[#0969DA] text-lg font-medium hidden sm:block">
                        {t("download")}
                      </span>
                    </div>
                  </label>

                  <input
                    id="degreeFile"
                    accept="image/png, image/gif, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                      handleSetDegreeFile(e);
                      form.setValue("certificate_name", e.target.value);
                    }}
                  />
                </div>
                <span className="text-red-400 text-xs block">
                  {form.formState.errors.certificate_name?.message}
                </span>
                <span className="text-[#57606A] text-sm">
                  {t("diploma_desc")}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex gap-2 items-center">
                  <FormField
                    control={form.control}
                    name="is_cert_privileged"
                    render={({ field }) => (
                      <FormItem className="flex gap-2 items-center">
                        <FormControl className="mt-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="is_cert_privileged"
                          />
                        </FormControl>
                        <label
                          htmlFor="is_cert_privileged"
                          className="text-[#424A53] font-medium text-sm "
                        >
                          {t("privilege_label")}
                        </label>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="has_foreign_language_degree"
                  className="text-[#424A53] font-medium text-sm "
                >
                  {t("certificate_title")}
                </label>
                <RadioGroup defaultValue="no" className="flex gap-8 mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no"
                      id="no"
                      className="!border-[#AFB8C1]"
                      onClick={() => setHasLanguageDegree(false)}
                    />
                    <Label
                      htmlFor="no"
                      className="!text-[#424A53] font-normal cursor-pointer"
                    >
                      {t("no")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="yes"
                      id="yes"
                      className="!border-[#AFB8C1]"
                      onClick={() => setHasLanguageDegree(true)}
                    />
                    <Label
                      htmlFor="yes"
                      className="!text-[#424A53] font-normal cursor-pointer"
                    >
                      {t("yes")}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {hasLanguageDegree ? (
                <div>
                  <p className="text-[#424A53] font-light mb-6">
                    {t("certificate_desc")}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
                    <div className="flex-1 w-full">
                      <label
                        htmlFor="certificates"
                        className="text-[#424A53] font-medium text-sm"
                      >
                        {t("certificate_label")}
                      </label>
                      <Select
                        onValueChange={(value) => {
                          setLangCertificate(
                            certificates.find((cer) => cer.label === value)?.id
                          );
                        }}
                      >
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="certificates"
                            placeholder={t("select_certificate")}
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {certificates.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.label}
                                className="!text-[#424A53] cursor-pointer"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 w-full">
                      <label
                        htmlFor="certificates_name"
                        className="text-[#424A53] font-medium text-sm"
                      >
                        {t("certificate_name_label")}
                      </label>
                      <div className="flex gap-2 items-center">
                        <Input
                          className="!border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                          placeholder={t("certificate_name")}
                          id="certificates_name"
                          value={certificateFile?.name}
                          disabled
                        />
                        <label htmlFor="certificateFile">
                          <div className="h-max border !border-[#0969DA] !bg-transparent flex gap-1.5 items-center py-3 px-5 rounded-lg cursor-pointer">
                            <BaseIcon name="upload" color="#0969DA" />
                            <span className="text-[#0969DA] text-lg font-medium hidden sm:block">
                              {t("download")}
                            </span>
                          </div>
                        </label>

                        <input
                          id="certificateFile"
                          accept="image/png, image/gif, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          className="hidden"
                          type="file"
                          onChange={(e) => handleSetCertificateFile(e)}
                        />
                      </div>
                      <p className="text-[#57606A] text-sm w-64">
                        {t("certificate_name_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <Button
                className={`${
                  !isLoading ? "!bg-[#18324D]" : "!bg-[#18324d83]"
                } w-full !py-[14px] h-auto`}
              >
                {t("submit")}
              </Button>
            </Form>
          </form>
        </div>
      </FormLayout>
    </SEO>
  );
};

export default withAuth(EducationInfo);
