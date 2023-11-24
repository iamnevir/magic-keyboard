import { useCartDrawer } from "@/hooks/use-shopping-cart-drawer";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import AnimateButton from "./animate-button";
import useCart from "@/hooks/use-shopping-cart";
import { formatCurrency } from "@/lib/utils";
import CartItem from "./cart-item";
import { ExternalLinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
              className=" absolute top-5 group hover:translate-x-3 -translate-x-5  cursor-pointer duration-500 flex items-center gap-2 font-semibold left-4"
            >
              <ExternalLinkIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 duration-500" />
              Giỏ hàng
            </div>
            {cart.items.map((item) => (
              <CartItem item={item} />
            ))}
          </div>
          <div className=" fixed dark:bg-black bg-white w-full bottom-0 h-[30%] px-4 ">
            <div className=" w-full flex items-center justify-between  font-semibold py-3">
              <span className="">Tổng tiền</span>
              <span>{formatCurrency(totalPrice)}</span>
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
      </Drawer>
    </>
  );
};

export default ShoppingCartDrawer;
