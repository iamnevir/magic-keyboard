"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import useCart from "@/hooks/use-shopping-cart";
import { ProductCart } from "@/type";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import QuantityPicker from "../products/quantity-picker";
import { Trash2 } from "lucide-react";
import AnimateButton from "../animate-button";

export default function CartTable() {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const renderCell = React.useCallback(
    (product: ProductCart, columnKey: React.Key) => {
      switch (columnKey) {
        case "product":
          return (
            <div className=" flex items-start justify-start gap-3 w-full">
              <div className=" p-1">
                {" "}
                <Image
                  src={product.image ? product.image : ""}
                  alt="image"
                  width={150}
                  height={100}
                  className=" w-[150px] h-[100px]"
                />
              </div>
              <div className=" flex flex-col items-start w-full font-semibold text-xs gap-1">
                <span>{product.name}</span>
                {product.options?.map((o) => (
                  <span>
                    {o.key}
                    {": "}
                    <span className="font-normal"> {o.value}</span>
                  </span>
                ))}{" "}
              </div>{" "}
            </div>
          );
        case "price":
          return (
            <span className="font-semibold text-xl">
              {formatCurrency(product.price ? product.price : 0)}
            </span>
          );
        case "quantity":
          return (
            <div className=" w-[115px]">
              {" "}
              <QuantityPicker
                quantity={product.quantity}
                minus={() =>
                  cart.updateItem({
                    data: product,
                    quantity: product.quantity - 1,
                  })
                }
                plus={() =>
                  cart.updateItem({
                    data: product,
                    quantity: product.quantity + 1,
                  })
                }
                size="md"
              />
            </div>
          );
        case "totalPrice":
          return (
            <div className=" w-20">
              {" "}
              <span className=" font-semibold text-xl">
                {formatCurrency(product.totalPrice ? product.totalPrice : 0)}
              </span>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete">
                <span
                  onClick={() => cart.removeItem(product)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <Trash2 />
                </span>
              </Tooltip>
            </div>
          );
      }
    },
    []
  );
  const columns = [
    {
      key: "product",
      label: "Sản phẩm",
    },
    {
      key: "price",
      label: "Giá",
    },
    {
      key: "quantity",
      label: "Số lượng",
    },
    {
      key: "totalPrice",
      label: "Tổng giá",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];
  const subTotal = cart.items.reduce(
    (sum, price) => sum + price.totalPrice!,
    0
  );
  return (
    <div className="flex flex-col items-end px-20 space-y-5">
      <Table aria-label="Shopping Cart Item Table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {cart.items.map((item) => (
            <TableRow key={item.productId}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className=" flex flex-col w-[20dvw]">
        <div className=" w-full flex items-center justify-between  font-semibold py-3">
          <span className="">Tổng tiền</span>
          <span>{formatCurrency(subTotal)}</span>
        </div>
        <AnimateButton
          text="Đặt hàng"
          color="white"
          className=" bg-yellow-400 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
        />
        <AnimateButton
          text="Thanh toán ngay"
          color="white"
          className="mt-5 bg-green-500 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
        />
      </div>
    </div>
  );
}
