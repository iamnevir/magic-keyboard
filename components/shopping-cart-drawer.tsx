"use client";
import { useCartDrawer } from "@/hooks/use-shopping-cart-drawer";
import "react-modern-drawer/dist/index.css";
import AnimateButton from "./animate-button";
import useCart from "@/hooks/use-shopping-cart";
import { formatCurrency } from "@/lib/utils";
import CartItem from "./cart-item";
import { ExternalLinkIcon, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });
const ShoppingCartDrawer = () => {
  const cartDrawer = useCartDrawer();
  const router = useRouter();
  const cart = useCart();
  const totalPrice = cart.items.reduce(
    (sum, price) => sum + price.totalPrice!,
    0
  );
  return (
    <>
      <Drawer
        open={cartDrawer.isOpen}
        onClose={cartDrawer.onClose}
        direction="right"
        size={400}
      >
        <div className=" relative dark:bg-black w-full h-full shadow-md dark:shadow-slate-500 shadow-black/50">
          <div className=" w-full pb-[60%] h-full flex items-center flex-col pt-16 gap-2 overflow-y-auto overflowCart ">
            <div
              onClick={() => router.push("/cart")}
              className=" absolute top-5 group hover:translate-x-3 z-[99999] -translate-x-5  cursor-pointer duration-500 flex items-center gap-2 font-semibold left-4"
            >
              <ExternalLinkIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 duration-500" />
              Giỏ hàng
              <ShoppingCart className="w-5 h-5 " />
            </div>
            {cart.items.map((item, index) => (
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={fadeIn("left", "spring", 0.2 * index, 1)}
                key={index}
              >
                <CartItem item={item} />
              </motion.div>
            ))}
          </div>
          <div className=" fixed dark:bg-black bg-white w-full bottom-0 h-[30%] px-4 ">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeIn("left", "spring", 0.1, 1)}
              className=" w-full flex items-center justify-between  font-semibold py-3"
            >
              <span className="">Tổng tiền</span>
              <span>{formatCurrency(totalPrice)}</span>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeIn("left", "spring", 0.3, 1)}
            >
              <AnimateButton
                text="Đặt hàng"
                onClick={() => router.push(`/checkout`)}
                color="white"
                className=" bg-yellow-400 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeIn("left", "spring", 0.5, 1)}
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
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
