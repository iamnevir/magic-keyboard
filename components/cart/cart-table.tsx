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
import { motion } from "framer-motion";
import { fadeInOne } from "@/lib/motion";
import { useRouter } from "next/navigation";
import NoCartItem from "./no-cart-item";
export default function CartTable() {
  const cart = useCart();
  const isMobile = window.screen.width <= 768;
  const router = useRouter();
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
                  className=" sm:w-[150px] sm:h-[100px] w-[100px] h-[70px] object-contain"
                />
              </div>
              <div className=" flex flex-col items-start w-full font-semibold text-xs gap-1">
                <span>{product.name}</span>
                {product.options?.map((o) => (
                  <span key={o.key}>
                    {o.key}
                    {": "}
                    <span className="font-normal"> {o.value}</span>
                  </span>
                ))}{" "}
                {isMobile ? (
                  <span
                    className=" text-white/50 underline underline-offset-1"
                    onClick={() => cart.removeItem(product)}
                  >
                    {" "}
                    Remove
                  </span>
                ) : null}
              </div>{" "}
            </div>
          );
        case "price":
          return (
            <div className=" space-y-2">
              <span className="sm:font-semibold sm:text-xl">
                {formatCurrency(product.price ? product.price : 0)}
              </span>
              {isMobile ? (
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
                  size="sm"
                />
              ) : null}
            </div>
          );
        case "quantity":
          return (
            <div className=" sm:w-[115px] w-[50px]">
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
            <div className="sm:flex sm:w-20 hidden">
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
  if (cart.items.length < 1) {
    return <NoCartItem />;
  }
  return (
    <div className="flex flex-col items-end sm:px-20 p-2 space-y-5">
      <Table aria-label="Shopping Cart Item Table">
        <TableHeader>
          {!isMobile
            ? columns.map((column) => (
                <TableColumn
                  key={column.key}
                  align={column.key === "actions" ? "center" : "start"}
                >
                  {column.label}
                </TableColumn>
              ))
            : columns
                .filter((i) => ["product", "price"].includes(i.key))
                .map((column) => (
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className=" flex flex-col sm:w-[20dvw] w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInOne("left", "spring", 0.1, 1)}
          className=" w-full flex items-center justify-between  font-semibold py-3"
        >
          <span className="">Tổng tiền</span>
          <span>{formatCurrency(subTotal)}</span>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInOne("left", "spring", 0.3, 1)}
        >
          <AnimateButton
            onClick={() => router.push(`/checkout`)}
            text="Đặt hàng"
            color="white"
            className=" bg-yellow-400 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInOne("left", "spring", 0.5, 1)}
        >
          <AnimateButton
            text="Thanh toán ngay"
            onClick={() => router.push(`/checkout`)}
            color="white"
            className="my-5 bg-green-500 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
          />
        </motion.div>
      </div>
    </div>
  );
}
