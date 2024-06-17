"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PaymentLayout from "@/layouts/PaymentLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Wrapper from "../Wrapper";
import PaymentDetailsCard from "./PaymentDetailsCard";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  cardNumber: z.string().length(16, { message: "Invalid card number" }),
});

const PlasticCard = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    router.push("/payment/operation/verify");
  };

  return (
    <PaymentLayout>
      <Wrapper title="To’lov cheki">
        <div className="flex gap-12 md:flex-row flex-col">
          <PaymentDetailsCard />
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <p className="text-[#18324D] font-medium">
                  Ro’yxatdan o’tmasdan to’lovni amalga oshirish
                </p>
                <div className="flex-1 w-full">
                  <label
                    htmlFor="cardNumber"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    Karta raqami
                  </label>
                  <Input
                    id="cardNumber"
                    className="border-[#D0D7DE] bg-[#F0F2F5] outline-none !py-4 !px-3 text-[#24292F] text-lg font-medium placeholder:text-[#6E7781] "
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    {...form.register("cardNumber")}
                  />
                  <span className="text-red-400 text-xs">
                    {form.formState.errors.cardNumber?.message}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    id="privacy"
                    onClick={() => setIsChecked(!isChecked)}
                  />
                  <label
                    htmlFor="privacy"
                    className="text-[#424A53] font-medium text-sm"
                  >
                    “To’lash” tugmasisni bosish orqali, siz{" "}
                    <span className="text-[#0055FB]">Ommaviy oferta</span>{" "}
                    shartlariga rozilik bildirgan bo’lasiz.
                  </label>
                </div>
                <Button
                  disabled={!isChecked}
                  className="w-full !bg-[#18324D]"
                  onClick={() => router.push("/payment/operation/verify")}
                >
                  To’lash
                </Button>
              </div>
            </Form>
          </form>
        </div>
      </Wrapper>
    </PaymentLayout>
  );
};

export default PlasticCard;
