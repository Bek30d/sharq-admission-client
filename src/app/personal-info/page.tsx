"use client";

import BaseIcon from "@/components/icons/BaseIcon";
import FormLayout from "@/layouts/FormLayout";
import SEO from "@/layouts/SEO";
import Image from "next/image";
import React from "react";
import user from "../../../public/assets/user-profile.png";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/datePicker/DatePicker";

const schema = z.object({
  lastname: z.string().min(3, "lastname is required"),
  name: z.string().min(3, "name is required"),
  fathername: z.string().min(3, "fathername is required"),
  birthdate: z.string().min(3, "birthdate is required"),
  idnumber: z.string().min(3, "idnumber is required"),
  jshshir: z.string().min(3, "jshshir is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18"),
});

type FormData = z.infer<typeof schema>;

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <SEO>
      <FormLayout>
        <div className="my-5 p-10 bg-white rounded-2xl">
          <h1 className="text-[32px] font-semibold text-[#18324D] mb-8">
            Shaxsiy ma’lumotlar
          </h1>

          <div className="bg-[#F6F8FA] mb-8 w-40 h-40 flex items-center justify-center rounded-full shadow border border-[#EAEEF2]">
            <Image src={user} alt={"some image"} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center gap-6 mb-6">
              <div className="flex-1">
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
                  {...register("lastname")}
                />
              </div>
              <div className="flex-1">
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
                  {...register("name")}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-6 mb-6">
              <div className="flex-1">
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
                  {...register("fathername")}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="birthdate"
                  className="text-[#424A53] font-medium text-sm"
                >
                  Tug`ilgan sanangiz
                </label>
                {/* <Input
                  id="birthdate"
                  className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                  placeholder="Tug`ilgan sanangiz"
                  {...register("birthdate")}
                /> */}
                <DatePickerDemo />
              </div>
            </div>
            <div className="flex justify-between items-center gap-6 mb-6">
              <div className="flex-1">
                <label
                  htmlFor="idnumber"
                  className="text-[#424A53] font-medium text-sm"
                >
                  Passport / ID seriya va raqami
                </label>
                <Input
                  id="idnumber"
                  className="border-none bg-[#F6F8FA] outline-none !py-4 !px-3 text-[#424A53]"
                  placeholder="Passport / ID seriya va raqami"
                  {...register("idnumber")}
                />
              </div>
              <div className="flex-1">
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
                  {...register("jshshir")}
                />
              </div>
            </div>
          </form>
        </div>
      </FormLayout>
    </SEO>
  );
};

export default PersonalInfo;
