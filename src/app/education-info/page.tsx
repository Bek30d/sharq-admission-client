"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const schema = z.object({
  college: z.string().min(3, "college is required"),
  year_of_entiring_college: z
    .date()
    .min(new Date(1900, 0, 1), "year_of_entiring_college is required"),
  yead_of_graduation_collage: z
    .date()
    .min(new Date(1900, 0, 1), "yead_of_graduation_collage is required"),
  region: z.string().min(3, "region is required"),
  district: z.string().min(3, "district is required"),
  collage_name: z.string().min(3, "collage_name is required"),
  degree_name: z.string().min(3, "diploma_name is required"),
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

const regions = [
  {
    value: "tashkent",
    label: "Toshkent",
  },
  {
    value: "bukhara",
    label: "Bukhara",
  },
  {
    value: "samarqand",
    label: "Samarqand",
  },
  {
    value: "navoi",
    label: "Navoi",
  },
  {
    value: "jizzax",
    label: "Jizzax",
  },
  {
    value: "qashqadaryo",
    label: "Qashqadaryo",
  },
  {
    value: "sirdaryo",
    label: "Sirdaryo",
  },
  {
    value: "qoraqalpogiston",
    label: "Qoraqalpogiston",
  },
  {
    value: "andijon",
    label: "Andijon",
  },
  {
    value: "namangan",
    label: "Namangan",
  },
  {
    value: "surxondaryo",
    label: "Surxondaryo",
  },
];

const district = [
  {
    value: "toshkent",
    label: "Toshkent",
  },
  {
    value: "bukhara",
    label: "Bukhara",
  },
  {
    value: "samarqand",
    label: "Samarqand",
  },
  {
    value: "navoi",
    label: "Navoi",
  },
];

const certificates = [
  {
    value: "ielts",
    label: "IELTS",
  },
  {
    value: "toefl",
    label: "TOEFL",
  },
  {
    value: "gre",
    label: "GRE",
  },
  {
    value: "gmat",
    label: "GMAT",
  },
];

const EducationInfo = () => {
  const [hasLanguageDegree, setHasLanguageDegree] = useState(false);
  const [degreeFile, setDegreeFile] = useState<any>(null);
  const [isHonorsDegree, setIsHonorsDegree] = useState(false);
  const [certificat, setCertificate] = useState<string>("");
  const [certificateFile, setCertificateFile] = useState<any>(null);
  const [personalInfo, setPersonalInfo] = useLocalStorage("personalInfo", {});
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   ...personalInfo,
    // },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setPersonalInfo(data);
    // router.push("/education-info");
    console.log(data);
  };

  function handleSetDegreeFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setDegreeFile(event.target.files[0]);
    }
  }

  function handleSetCertificateFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files && event.target.files.length > 0) {
      setDegreeFile(event.target.files[0]);
    }
  }

  console.log(form.formState.errors);

  return (
    <SEO>
      <FormLayout>
        <div className="my-5 py-6 px-5 md:p-10 bg-white rounded-2xl">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#18324D] mb-8">
            Ta’lim ma’lumotlari
          </h2>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
              <div className="mb-6 w-full">
                <label
                  htmlFor="college"
                  className="text-[#424A53] font-medium text-sm"
                >
                  Bitirgan yoki tahsil olayotgan ta’lim tdargohi
                </label>

                <Controller
                  name="college"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                        <SelectValue
                          id="college"
                          placeholder="Kollej"
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
                  {form.formState.errors.college?.message}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="year_of_entiring_college"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Kirgan yili
                  </label>
                  <Controller
                    control={form.control}
                    name="year_of_entiring_college"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="!border border-[#D0D7DE] !bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]"
                      />
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.year_of_entiring_college?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="yead_of_graduation_collage"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Bitirgan yili
                  </label>
                  <Controller
                    control={form.control}
                    name="yead_of_graduation_collage"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="!border border-[#D0D7DE] !bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]"
                      />
                    )}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.yead_of_graduation_collage?.message}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
                <div className="flex-1 w-full">
                  <label
                    htmlFor="region"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Ta’lim dargohi joylashgan viloyat yoki shahar
                  </label>
                  <Controller
                    name="region"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="region"
                            placeholder="Viloyat"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {regions.map((item) => (
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
                    {form.formState.errors.region?.message}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="district"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Tumanni tanlang
                  </label>
                  <Controller
                    name="district"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="district"
                            placeholder="Tumanni tanlang"
                            className=" placeholder:!text-[#6E7781]"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {district.map((item) => (
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
                    {form.formState.errors.district?.message}
                  </span>
                </div>
              </div>

              <div className="w-full mb-6">
                <label
                  htmlFor="collage_name"
                  className="text-[#424A53] font-medium text-sm"
                >
                  Ta’lim muassasasi nomi
                </label>
                <Input
                  id="collage_name"
                  className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                  placeholder="Ta’lim muassasasi nomi"
                  {...form.register("collage_name")}
                />
                <span className="text-red-400 text-xs">
                  {form.formState.errors.collage_name?.message}
                </span>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="collage_name"
                  className="text-[#424A53] font-medium text-sm"
                >
                  Diplom yoki shahodatnoma nusxasi
                </label>

                <div className="flex gap-2 items-center">
                  <Input
                    className="!border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                    placeholder="Diplom yoki shahodatnoma nomi"
                    id="degree_name"
                    value={degreeFile?.name}
                    disabled
                  />
                  <label htmlFor="degreeFile">
                    <div className="h-max border !border-[#0969DA] !bg-transparent flex gap-1.5 items-center py-3 px-5 rounded-lg cursor-pointer">
                      <BaseIcon name="upload" color="#0969DA" />
                      <span className="text-[#0969DA] text-lg font-medium">
                        Yuklash
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
                      form.setValue("degree_name", e.target.value);
                    }}
                  />
                </div>
                <span className="text-red-400 text-xs block">
                  {form.formState.errors.degree_name?.message}
                </span>
                <span className="text-[#57606A] text-sm">
                  Hajmi 5 MBdan katta bo’lmagan JPEG, JPG, PNG, PDF fayllarni
                  yuklang
                </span>
              </div>

              <div className="mb-6">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="honors_degree"
                    onChange={() => setIsHonorsDegree(!isHonorsDegree)}
                  />
                  <label
                    htmlFor="honors_degree"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Imtiyozli diplom yoki shahodatnoma
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="has_foreign_language_degree"
                  className="text-[#424A53] font-medium text-sm "
                >
                  Sizda chet tili sertifikati mavjudmi?
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
                      Yo’q, mavjud emas
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
                      Ha, mavjud
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {hasLanguageDegree ? (
                <div>
                  <p className="text-[#424A53] font-light mb-6">
                    Ingliz tilidan quyidagi xalqaro yoki milliy sertifikatga ega
                    boʻlgan abituriyentlar kirish imtihonlaridan ozod etiladi:
                    IELTS – 5,5 va undan yuqori; TOEFL IBT – 46-59 va undan
                    yuqori; TOEFL ITP – 450 va undan yuqori; CEFR – B2 va undan
                    yuqori.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
                    <div className="flex-1 w-full">
                      <label
                        htmlFor="certificates"
                        className="text-[#424A53] font-medium text-sm"
                      >
                        Sertifikat turi
                      </label>
                      <Select>
                        <SelectTrigger className="border-[#D0D7DE] bg-white outline-none !py-4 !px-3 h-auto text-[#424A53] placeholder:text-[#6E7781]">
                          <SelectValue
                            id="certificates"
                            placeholder="Sertifikat"
                            className=" placeholder:!text-[#6E7781]"
                            onChange={(e) => setCertificate(e.target.value)}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {certificates.map((item) => (
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
                      <span className="text-red-400 text-xs">
                        {form.formState.errors.region?.message}
                      </span>
                    </div>
                    <div className="flex-1 w-full">
                      <label
                        htmlFor="certificates_name"
                        className="text-[#424A53] font-medium text-sm"
                      >
                        Sertifikatingiz nusxasini yuklang
                      </label>
                      <div className="flex gap-2 items-center">
                        <Input
                          className="!border-[#D0D7DE] bg-white outline-none !py-4 !px-3 text-[#424A53] placeholder:text-[#6E7781] "
                          placeholder="Diplom yoki shahodatnoma nomi"
                          id="certificates_name"
                          value={certificateFile?.name}
                          disabled
                        />
                        <label htmlFor="certificateFile">
                          <div className="h-max border !border-[#0969DA] !bg-transparent flex gap-1.5 items-center py-3 px-5 rounded-lg cursor-pointer">
                            <BaseIcon name="upload" color="#0969DA" />
                            <span className="text-[#0969DA] text-lg font-medium">
                              Yuklash
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
                        Hajmi 5 MBdan katta bo’lmagan JPEG, JPG, PNG, PDF
                        fayllarni yuklang
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <Button className="!bg-[#18324D] w-full !py-[14px] h-auto">
                Davom etish
              </Button>
            </Form>
          </form>
        </div>
      </FormLayout>
    </SEO>
  );
};

export default EducationInfo;
