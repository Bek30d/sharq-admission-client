import ProfileLayout from "@/layouts/ProfileLayout";
import SEO from "@/layouts/SEO";
import React, { useRef } from "react";
import { cookies } from "next/headers";
import { useReactToPrint } from "react-to-print";
import MainComponent from "./components/MainComponent";

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

  return (
    <SEO>
      <ProfileLayout title="Abituriyent qayd varaqasi">
        <MainComponent applicantInfo={applicantInfo} />
      </ProfileLayout>
    </SEO>
  );
};

export default ApplicantInfo;
