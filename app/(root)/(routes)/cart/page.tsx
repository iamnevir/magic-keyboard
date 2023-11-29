"use client";
import Breadcrumb from "@/components/bread-crum";
import OrderItem from "@/components/cart/order-item";
import { api } from "@/convex/_generated/api";
import { formatCurrency } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Store } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
const CartTable = dynamic(() => import("@/components/cart/cart-table"), {
  ssr: false,
});

const CartPage = () => {
  const { user } = useUser();
  const orders = useQuery(api.order.getOrderByUserId, { userId: user?.id });
  return (
    <Tabs color="success" aria-label="Options">
      <Tab key="cart" title="Giỏ hàng">
        <div className=" w-full h-full flex flex-col gap-3 sm:p-0 pt-5">
          <div className=" font-semibold text-3xl justify-center w-full h-full flex ">
            Giỏ hàng
          </div>
          <Breadcrumb href="/cart" item="Giỏ hàng của bạn" className="" />
          <CartTable />
        </div>
      </Tab>
      <Tab
        key="donhang"
        title="Đơn hàng"
        className="flex flex-col gap-4 overflow-auto"
      >
        {orders?.map((item, index) => (
          <div key={index}>
            <OrderItem item={item} />
          </div>
        ))}
      </Tab>
    </Tabs>
  );
};

export default CartPage;
