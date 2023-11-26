"use client";

import dynamic from "next/dynamic";
const ShoppingCartDrawer = dynamic(
  () => import("@/components/shopping-cart-drawer"),
  { ssr: false }
);
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sm:mt-[70px] mt-3 sm:px-20 px-1 w-full h-full">
      <ShoppingCartDrawer />
      {children}
    </div>
  );
}
