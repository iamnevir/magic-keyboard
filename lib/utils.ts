import { Doc } from "@/convex/_generated/dataModel";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertTimestampToRelativeTime(timestamp: number): string {
  const now: Date = new Date();
  const targetDate: Date = new Date(timestamp);

  const timeDifference: number = now.getTime() - targetDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const months: number = Math.floor(days / 30); // Giả sử một tháng có 30 ngày
  const years: number = Math.floor(days / 365); // Giả sử một năm có 365 ngày

  if (years > 0) {
    return `${years} năm trước`;
  } else if (months > 0) {
    return `${months} tháng trước`;
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `${seconds} giây trước`;
  }
}
export function formatVietnameseDate(timespanInMilliseconds: number): string {
  const months: string[] = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const date = new Date(timespanInMilliseconds);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = ` ${day}, ${months[month]}, ${year}`;

  return formattedDate;
}

export const formatCurrency = (value: number) => {
  const formatter = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  if (!value) {
    return "Free";
  }
  return formatter.format(value);
};

export const ListImage = ({ product }: { product: Doc<"product"> }) => {
  const imageList = product.options?.map((item) =>
    item.option.map((o) => o.image)
  );
  if (imageList === undefined) {
    if (product.images) {
      return [...product.images];
    }
  } else {
    return [...imageList.flat(), ...product.images!].filter(
      Boolean
    ) as string[];
  }
};
