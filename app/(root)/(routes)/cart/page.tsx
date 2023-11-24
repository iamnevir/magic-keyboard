import Breadcrumb from "@/components/bread-crum";
import dynamic from "next/dynamic";
const CartTable = dynamic(() => import("@/components/cart/cart-table"), {
  ssr: false,
});

const CartPage = () => {
  return (
    <div className=" w-full h-full ">
      <div className=" font-semibold text-3xl justify-center w-full h-full flex pt-10 pb-5">
        Giỏ hàng
      </div>
      <Breadcrumb href="/cart" item="Giỏ hàng của bạn" className="pb-14" />

      <CartTable />
    </div>
  );
};

export default CartPage;
