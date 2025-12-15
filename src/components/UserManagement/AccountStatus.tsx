"use client";
import userImage from "@/assets/profile.jpg";
import { useUpdateusersStatusMutation } from "@/redux/api/users";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

type Props = {
  closeModal?: () => void;
  selectedUser?: any;
};

export default function AccountStatus({ closeModal, selectedUser }: Props) {
  const [updateFN, { isLoading }] = useUpdateusersStatusMutation();
  const hangleAction = async () => {
    // Handle block/unblock action here
    if (!selectedUser) return;
    try {
      await updateFN(selectedUser.id);
      closeModal && closeModal();
    } catch (error) {
      toast.error((error as string) || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Image
          src={selectedUser?.profileImage || userImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-textColor text-center">
          {selectedUser?.fullName || "N/A"}
        </h1>
        <h1 className="text-sm text-secondaryColor text-center">
          {selectedUser?.email || "N/A"}
        </h1>
      </div>
      <div className="flex items-center py-5 gap-5">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={hangleAction} variant="default">
          {isLoading
            ? "Processing..."
            : selectedUser?.status === "ACTIVE"
            ? "Block Account"
            : "Unblock Account"}
        </Button>
      </div>
    </div>
  );
}
