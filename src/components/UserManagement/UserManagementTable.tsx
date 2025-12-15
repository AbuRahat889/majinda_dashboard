"use client";
import profileImage from "@/assets/profile.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetusersListQuery } from "@/redux/api/users";
import Image from "next/image";
import { useState } from "react";
import FullTableSkeleton from "../Skletone/Table";
import { MediaButton } from "../ui/icon";
import Modal from "../ui/modal";
import Pagination from "../ui/Pagination";
import AccountStatus from "./AccountStatus";
import UserDetails from "./UserDetails";

const UserManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: userList, isLoading } = useGetusersListQuery({
    page: currentPage,
    limit: 15,
  });

  const totalPages = userList?.data?.meta?.totalPages || 1;
  const currentItems = userList?.data?.data?.length ? userList.data.data : [];

  if (isLoading) {
    return <FullTableSkeleton />;
  }

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="w-full rounded-xl">
        <thead className="border-b border-borderColor rounded-full bg-white">
          <tr className="text-[#667085] text-left text-sm font-semibold ">
            <th className="py-4 px-4">#</th>
            <th className="py-4 px-4">User Name</th>
            <th className="py-4 px-4">Email</th>
            <th className="py-4 px-4">Phone</th>
            <th className="py-4 px-4">Status</th>
            <th className="py-4 px-4 text-center w-36">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 ? (
            currentItems?.map((info: any, index: number) => (
              <tr
                key={info.id}
                className="text-sm text-textColor font-normal bg-white rounded-full"
              >
                <td className="py-2 px-4 w-7">{index + 1}</td>
                <td className="py-2 px-4 flex items-center">
                  <Image
                    src={info?.profileImage || profileImage}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full mr-2"
                  />
                  <span className="font-semibold truncate">
                    {info?.firstName || info?.fullName || ""}{" "}
                    {info?.lastName || ""}
                  </span>
                </td>
                <td className="py-2 px-4 text-secondaryColor truncate">
                  {info?.email}
                </td>
                <td className="py-2 px-4 text-secondaryColor">
                  {info?.phone || "N/A"}
                </td>
                <td className="py-2 px-4 cursor-pointer">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      info?.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {info?.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-right">
                  <div className="flex justify-center items-center gap-4">
                    <div
                      onClick={() => {
                        setIsLinkModalOpen(true);
                        setSelectedUser(info);
                      }}
                    >
                      <Button variant={"default"}>View Details</Button>
                    </div>
                    <div
                      onClick={() => {
                        setIsCreateModalOpen(true);
                        setSelectedUser(info);
                      }}
                    >
                      <MediaButton type="dot" />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-4 text-gray-500 bg-white"
              >
                User not found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        className="lg:w-[20%] bg-white"
      >
        <AccountStatus
          closeModal={() => setIsCreateModalOpen(false)}
          selectedUser={selectedUser}
        />
      </Modal>

      <Modal
        isModalOpen={isLinkModalOpen}
        setIsModalOpen={setIsLinkModalOpen}
        className="lg:w-[20%] bg-white"
      >
        <UserDetails user={selectedUser} />
      </Modal>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserManagementTable;
