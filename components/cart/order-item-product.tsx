import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OrderItemProduct = ({
  orderItem,
}: {
  orderItem: {
    product: Id<"product">;
    image?: string;
    quantity: number;
    price: number;
    option: string;
  };
}) => {
  const router = useRouter();
  const product = useQuery(api.product.getProductById, {
    productId: orderItem.product,
  });
  return (
    <div className=" flex sm:flex-row flex-col items-start justify-start gap-3 w-full">
      <div className=" flex items-start gap-3 w-full">
        <Image
          src={orderItem.image ? orderItem.image : ""}
          alt="image"
          width={150}
          height={150}
          onClick={() => router.push(`/products/${orderItem.product}`)}
          className=" w-[150px] h-[150px] object-contain rounded-[5px] cursor-pointer"
        />
        <div className=" flex items-start flex-col sm:flex-row w-full sm:justify-between">
          <div className=" flex flex-col items-start w-full font-semibold text-base gap-1">
            <span>{product?.name}</span>

            <span>{orderItem.option}</span>
            <span>
              {"Giá bán: "}
              {formatCurrency(product?.price ? product?.price : 0)}
            </span>
            <span>
              {"Số lượng: "}
              {orderItem.quantity}
            </span>
          </div>
          <span className="font-semibold flex items-center gap-2">
            <span className=" whitespace-nowrap">Thành tiền:</span>
            {formatCurrency(orderItem.price ? orderItem.price : 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemProduct;
