import { Doc } from "@/convex/_generated/dataModel";
import OptionPickerItem from "./option-picker-item";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AnimateButton from "../animate-button";
import useCart from "@/hooks/use-shopping-cart";
import QuantityPicker from "./quantity-picker";
const OptionPicker = ({ product }: { product: Doc<"product"> }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cart = useCart();
  const [optionList, setOptionList] = useState<
    { key: string; value: string }[] | undefined
  >([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (searchParams.toString()) {
      const params: string[] = searchParams.toString().split("&");
      const list: { key: string; value: string }[] | undefined = params.reduce(
        (acc: any, curr: string) => {
          let [key, value] = curr.split("=");
          value = decodeURIComponent(value.replaceAll("-", " "));
          acc.push({ key, value });
          return acc;
        },
        []
      );
      setOptionList(list);
    } else {
      try {
        const keys = product.options?.map((i) => i.name);
        const values = product.options?.map((i) => i.option[0].name);
        const list: { key: string; value: string }[] | undefined = keys?.map(
          (key, index) => ({ key, value: values![index] })
        );
        setOptionList(list);
      } catch (error) {
        setOptionList([{ key: "", value: "" }]);
      }
    }
  }, []);
  useEffect(() => {
    const hrefList = optionList?.map(
      (item) => `${item.key}=${item.value.replaceAll(" ", "-")}`
    );
    const href = hrefList?.join("&");
    router.push(`/products/${product._id}?${href}`, { scroll: false });
  }, [optionList]);
  const addToCart = () => {
    if (optionList) {
      const option = product.options![0].option.find(
        (o) => o.name === optionList[0].value
      );

      cart.addItem({
        productId: product._id,
        name: product.name,
        options: optionList,
        price: option?.price,
        totalPrice: option?.price ? option?.price * quantity : 0,
        quantity,
        image: option?.image ? option?.image : product.images![0],
      });
    }
  };
  const price =
    optionList?.length! > 0
      ? product.options![0].option.find((o) => o.name === optionList![0].value)
          ?.price
      : null;
  return (
    <div className=" flex flex-col items-start gap-3">
      {product.options?.map((item, index) => (
        <OptionPickerItem
          selectedOption={optionList?.find((o) => o.key === item.name)!}
          onChange={({ key, value }: { key: string; value: string }) => {
            const newArray = optionList;
            const index = newArray?.findIndex((o) => o.key === key);
            if (index !== -1 && index !== undefined) {
              newArray![index].value = value;
              setOptionList([...newArray!]);
            } else {
              setOptionList([...optionList!, { key, value }]);
            }
          }}
          options={item}
        />
      ))}
      <span className="text-xl md:text-2xl font-bold my-2">
        {" "}
        {formatCurrency(price ? price : product?.price!)}
      </span>{" "}
      <span className="font-semibold">Số lượng</span>
      {product.pay === "order" ? (
        <>
          <div className=" flex items-center w-full space-x-3">
            <QuantityPicker
              quantity={quantity}
              minus={() => {
                if (quantity > 1) {
                  setQuantity((q) => q - 1);
                }
              }}
              plus={() => {
                if (quantity < product.quantity!) {
                  setQuantity((q) => q + 1);
                }
              }}
              size="md"
            />
            <AnimateButton
              onClick={addToCart}
              text="Thêm vào giỏ hàng"
              color="white"
              className=" shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
            />
          </div>
          <AnimateButton
            className=" bg-blue-300 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
            text="Mua ngay"
            color="white"
          />
        </>
      ) : (
        <>
          <div className=" flex items-center w-full space-x-3">
            <div className="flex items-center shadow-md dark:shadow-white shadow-black rounded-[4px] px-3 bg-white dark:bg-black">
              <div className=" h-4 w-4  cursor-pointer">
                <svg
                  viewBox="0 -12 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Icon-Set-Filled"
                    transform="translate(-414.000000, -1049.000000)"
                    fill="#000000"
                  >
                    <path
                      d="M442,1049 L418,1049 C415.791,1049 414,1050.79 414,1053 C414,1055.21 415.791,1057 418,1057 L442,1057 C444.209,1057 446,1055.21 446,1053 C446,1050.79 444.209,1049 442,1049"
                      id="minus"
                      className=" dark:fill-white"
                    ></path>
                  </g>
                </svg>
              </div>

              <span className="m-2 dark:text-white text-black">{quantity}</span>
              <div className=" h-4 w-4 cursor-pointer">
                <svg
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    transform="translate(-362.000000, -1037.000000)"
                    fill="#000000"
                  >
                    <path
                      className="dark:fill-white"
                      d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <Button className=" font-semibold w-full bg-blue-700 rounded-[4px] hover:bg-purple-600 hover:scale-105 text-white duration-500 transition-all ">
              Pre-Order{" "}
            </Button>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default OptionPicker;
