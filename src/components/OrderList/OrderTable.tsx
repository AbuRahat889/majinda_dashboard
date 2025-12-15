"use client";
import { useUpdateOrdersMutation } from "@/redux/api/orderApi";
import { toast } from "react-toastify";
import TableSkeleton from "../Skletone/Table";
import { useState } from "react";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-pink-100 text-pink-800",
  DELIVERED: "bg-[#e9effd] text-[#2563eb]",
  CANCELLED: "bg-red-100 text-red-800",
};

interface Props {
  currentItems?: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  activeTab?: number;
}

const OrderTable = ({
  currentItems,
  isLoading,
  isFetching,
  isError,
  activeTab,
}: Props) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [updateOrderStatus, { isLoading: updateing }] =
    useUpdateOrdersMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setSelectedId(orderId);
    try {
      const updateInfo = {
        orderId: orderId,
        status: newStatus,
      };
      const res = await updateOrderStatus(updateInfo).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Status updated successfully");
      }
    } catch (error) {
      toast.error((error as string) || "Failed to update status");
    }
  };

  if (isLoading || isFetching) return <TableSkeleton />;
  if (isError) return <p>Failed to load orders</p>;
  return (
    <div className="">
      <div className="relative overflow-x-auto rounded-md p-6 bg-white ">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white">
            <tr className="text-[#667085] text-left text-sm font-semibold border-b">
              <th className="py-4 px-4">#</th>
              <th className="py-4 px-4">Customer Name</th>
              <th className="py-4 px-4">Phone</th>
              <th className="py-4 px-4">Product</th>
              <th className="py-4 px-4">Quantity</th>
              <th className="py-4 px-4">Address</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Status</th>
              {activeTab !== 3 && <th className="py-4 px-4 ">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order: any, index: number) => (
              <tr
                key={order.id || index}
                className="text-sm text-textColor font-normal leading-normal hover:bg-red-50 py-5 "
              >
                <td className="py-5 ">{index + 1}</td>
                <td className="py-2 px-4 text-left">{order.user.fullName}</td>
                <td className="py-2 px-4 text-left">
                  {order.user.phoneNumber}
                </td>
                <td className="py-2 px-4 text-left">{order.product.name}</td>
                {/* <td className="py-2 px-4 text-left">
                  {order.OrderVariant.map((v: any) => v.variant.name).join(
                    ", "
                  )}
                </td> */}
                <td className="py-2 px-4 text-left">{order.quantity}</td>
                <td className="py-2 px-4 text-left">
                  {order.street}, {order.city}
                </td>
                <td className="py-2 px-4 text-left">
                  {order.createdAt
                    ? new Date(order.createdAt)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")
                    : ""}
                </td>
                <td className="py-2 px-4 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                {(order?.status === "PROCESSING" ||
                  order?.status === "PENDING") && (
                  <td className="py-2 px-4  ">
                    <div className="flex gap-2 items-end">
                      <button
                        onClick={() => {
                          handleStatusChange(order?.id, "CANCELLED");
                        }}
                        className="bg-[#fae6e6] rounded-full text-primaryColor px-4 py-1"
                      >
                        Cancle
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(
                            order?.id,
                            order.status === "PENDING"
                              ? "PROCESSING"
                              : "DELIVERED"
                          );
                        }}
                        className="bg-primaryColor rounded-full text-white px-4 py-1"
                      >
                        {updateing && selectedId === order?.id
                          ? "Updating..."
                          : "Accept"}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
