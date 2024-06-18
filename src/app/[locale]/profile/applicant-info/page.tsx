import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React from "react";
import { cookies } from "next/headers";
import MainComponent from "./components/MainComponent";
import { getTranslations } from "next-intl/server";

async function getData(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/about-application/6",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.log("error");
  }

  return res.json();
}

const ApplicantInfo = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const applicantInfo = await getData(token?.value || "");
  const t = await getTranslations("ApplicantInfo");

  return (
    <SEO>
      <ProfileLayout title={t("title")}>
        <MainComponent applicantInfo={applicantInfo} />
      </ProfileLayout>
    </SEO>
  );
};

export default ApplicantInfo;
