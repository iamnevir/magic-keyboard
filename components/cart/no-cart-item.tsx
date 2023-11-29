import Lottie from "lottie-react";

import shopping from "@/public/shopping.json";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
const NoCartItem = () => {
  const router = useRouter();
  return (
    <div className=" w-full justify-center flex flex-col items-center sm:text-2xl text-xl text-center font-semibold">
      Giỏ hàng của bạn trống trơn như túi tiền của bạn vậy. Mua sắm ngay thôi
      nào!!
      <div className="sm:w-[500px] w-[300px]">
        <Lottie animationData={shopping} />
      </div>
      <Button
        onClick={() => router.push("/collections/all")}
        variant="shadow"
        size="lg"
        color="success"
      >
        Mua sắm ngay
        <ShoppingCart />
      </Button>
    </div>
  );
};

export default NoCartItem;
