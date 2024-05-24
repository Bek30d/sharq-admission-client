import ProfileSidebar from "@/components/profileSidebar/ProfileSidebar";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-6 flex gap-4">
      <ProfileSidebar />
      <div>{children}</div>
    </div>
  );
};

export default ProfileLayout;
