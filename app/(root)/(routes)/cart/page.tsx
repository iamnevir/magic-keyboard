import { Cart } from "@/components/cart/cart-page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Giỏ hàng của bạn",
};
const CartPage = () => {
  return <Cart />;
};

export default CartPage;
