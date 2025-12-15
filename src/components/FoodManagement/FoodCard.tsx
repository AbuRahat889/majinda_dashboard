"use client";

import fallbackCarImage from "@/assets/placeholder.webp";
import { useDeleteProductsMutation } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MediaButton } from "../ui/icon";

interface CarCardProps {
  content: any;
}

export default function FoodCard({ content }: CarCardProps) {
  const [deleteContent] = useDeleteProductsMutation();
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("Deleting...");
          try {
            const res = await deleteContent(id).unwrap();
            toast.dismiss(toastId);
            if (res.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your car listing has been deleted.",
                icon: "success",
              });
            }
          } catch (error) {
            toast.dismiss(toastId);
            toast.error(
              (typeof error === "string" && error) ||
                (error && typeof error === "object" && "message" in error
                  ? (error as any).message
                  : undefined) ||
                "Failed to delete car"
            );
          }
        }
      });
    } catch (error) {
      toast.error(
        (typeof error === "string" && error) ||
          (error && typeof error === "object" && "message" in error
            ? (error as any).message
            : undefined) ||
          "Failed to delete car"
      );
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      {/* Image */}
      <div className="relative">
        <Image
          src={content?.image || fallbackCarImage}
          alt="product image"
          className="object-fill h-48 w-full"
          height={500}
          width={500}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        <div className="">
          <h1 className="text-xl font-semibold text-textColor hover:underline leading-normal line-clamp-1 truncate">
            {content?.name}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base text-textColor leading-normal">
            Total Rating:{" "}
          </h1>
          <span className="text-secondaryColor">{content?.totalRaters}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base text-textColor leading-normal">
            Average Rating:{" "}
          </h1>
          <span className="text-secondaryColor">{content?.avgRating}</span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#f77902] leading-normal">
            ${content?.price}
          </h1>

          <div className="flex gap-2">
            <Link
              href={`/add-product?type=Edit&id=${content?.id}`}
              className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center"
            >
              <MediaButton type="edit" />
            </Link>
            <div
              onClick={() => handleDelete(content?.id)}
              className="bg-[#e8e8e9] text-gray-600 h-8 w-8 rounded-full text-sm flex items-center justify-center cursor-pointer"
            >
              <MediaButton type="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
