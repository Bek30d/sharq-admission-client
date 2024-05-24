import ProfileSidebar from "@/components/profileSidebar/ProfileSidebar";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-6 flex gap-4 flex-col lg:flex-row">
      <ProfileSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ProfileLayout;
