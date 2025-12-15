"use client";
import profileFallback from "@/assets/profile.jpg";
import Image from "next/image";

interface UserDetailsProps {
  user?: any;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-textColor text-center mb-4">
        User Info
      </h1>

      <div className="flex justify-center mb-4">
        <Image
          src={user?.profileImage || profileFallback}
          alt="Profile"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
      </div>
      <div className="space-y-2">
        <div className="relative">
          <label className="text-sm font-medium block text-[#62666E] mb-2">
            Name
          </label>
          <p className="w-full border-2 border-[#dce4e8] rounded-xl p-2 outline-none bg-[#e8e8e9] text-textColor">
            {user?.fullName}
          </p>
        </div>

        <div className="relative">
          <label className="text-sm font-medium block text-[#62666E] mb-2">
            Email
          </label>
          <p className="w-full border-2 border-[#dce4e8] rounded-xl p-2 outline-none bg-[#e8e8e9] text-textColor">
            {user?.email}
          </p>
        </div>
        <div className="relative">
          <label className="text-sm font-medium block text-[#62666E] mb-2">
            Phone Number
          </label>
          <p className="w-full border-2 border-[#dce4e8] rounded-xl p-2 outline-none bg-[#e8e8e9] text-textColor">
            {user?.phoneNumber || "N/A"}
          </p>
        </div>
        <div className="relative">
          <label className="text-sm font-medium block text-[#62666E] mb-2">
            Address
          </label>
          <p className="w-full border-2 border-[#dce4e8] rounded-xl p-2 outline-none bg-[#e8e8e9] text-textColor">
            {user?.street} {user?.city} {user?.state || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
