import Container from "@/components/container/Container";
import ProfileSidebar from "@/components/profileSidebar/ProfileSidebar";
import React from "react";

const ProfileLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <Container>
      <div className="py-6 flex gap-4 flex-col lg:flex-row">
        <ProfileSidebar />
        <div className="py-6 px-5 rounded-2xl bg-white block lg:hidden">
          <p className="text-[#424A53] font-medium text-lg">{title}</p>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
