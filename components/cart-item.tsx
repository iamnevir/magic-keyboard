import { formatCurrency } from "@/lib/utils";
import { ProductCart } from "@/type";
import Image from "next/image";
import QuantityPicker from "./products/quantity-picker";
import { Button } from "@nextui-org/button";
import UnderlineText from "./underline-animate";
import useCart from "@/hooks/use-shopping-cart";

const CartItem = ({ item }: { item: ProductCart }) => {
  const cart = useCart();
  return (
    <div className=" flex items-start justify-start gap-3 w-full">
      <div className=" p-1">
        {" "}
        <Image
          src={item.image ? item.image : ""}
          alt="image"
          width={150}
          height={100}
          placeholder="blur"
          blurDataURL="/loader.png"
          priority
          className=" w-[150px] h-[100px]"
        />
      </div>
      <div className=" flex flex-col items-start w-full font-semibold text-xs gap-1">
        <span>{item.name}</span>
        {item.options?.map((o) => (
          <span key={o.key}>
            {o.key}
            {": "}
            <span className="font-normal"> {o.value}</span>
          </span>
        ))}
        <span>{formatCurrency(item.price ? item.price : 0)}</span>
        <div className=" flex items-center">
          <QuantityPicker
            quantity={item.quantity}
            minus={() =>
              cart.updateItem({
                data: item,
                quantity: item.quantity - 1,
              })
            }
            plus={() =>
              cart.updateItem({
                data: item,
                quantity: item.quantity + 1,
              })
            }
            size="sm"
          />
          <Button
            onClick={() => cart.removeItem(item)}
            color="primary"
            variant="shadow"
          >
            <UnderlineText>Delete</UnderlineText>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
