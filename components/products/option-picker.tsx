import { Doc } from "@/convex/_generated/dataModel";
import OptionPickerItem from "./option-picker-item";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AnimateButton from "../animate-button";
import useCart from "@/hooks/use-shopping-cart";
import QuantityPicker from "./quantity-picker";
import { Tilt } from "@jdion/tilt-react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useTheme } from "next-themes";
const OptionPicker = ({
  product,
  onOptionChange,
}: {
  product: Doc<"product">;
  onOptionChange: (v: { key: string; value: string }) => void;
}) => {
  const isMobile = window.screen.width <= 768;
  const searchParams = useSearchParams();
  const router = useRouter();
  const cart = useCart();
  const { theme } = useTheme();
  const containerStyle = {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    ...(theme === "dark" && {
      boxShadow:
        "0 4px 6px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(255, 255, 255, 0.06)",
    }),
  };
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
      (item) => `${item.key}=${item.value.trim().replaceAll(" ", "-")}`
    );
    const href = hrefList?.join("&");
    router.push(`/products/${product.slug}?${href}`, { scroll: false });
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
        <div key={index}>
          {" "}
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
              onOptionChange({ key, value });
            }}
            options={item}
          />
        </div>
      ))}
      <div className=" flex items-center gap-3">
        <p className="text-xl md:text-2xl font-bold my-2">
          {formatCurrency(price ? price : product?.price!)}
        </p>
        <p
          className={cn(
            "text-xl md:text-2xl font-bold my-2",
            product.isSale ? " text-default-400 line-through" : ""
          )}
        >
          {product.isSale ? formatCurrency(product.salePrice!) : null}
        </p>
      </div>
      {product.isSale && (
        <Tilt disabled={isMobile}>
          <FlipClockCountdown
            to={new Date(product.timeSale!)}
            labels={["NGÀY", "GIỜ", "PHÚT", "GIÂY"]}
            labelStyle={{
              fontSize: 10,
              fontWeight: 500,
              color: theme === "dark" ? "white" : "black",
              textTransform: "uppercase",
            }}
            digitBlockStyle={{
              width: 36,
              height: 60,
              fontSize: 30,
              color: theme === "dark" ? "white" : "black",
              backgroundColor: theme === "dark" ? "black" : "white",
              ...containerStyle,
            }}
            dividerStyle={{
              color: theme === "dark" ? "black" : "white",
              height: 1,
            }}
            className="sm:max-w-none max-w-xs"
            separatorStyle={{
              color: "blue",
              size: "6px",
            }}
          />
        </Tilt>
      )}
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
      ) : product.pay === "preorder" ? (
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
            text="Pre-Order Now"
            color="white"
          />
        </>
      ) : (
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
              text="Comming Soon"
              color="white"
              className=" shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
            />
          </div>
          <AnimateButton
            className=" bg-blue-300 shadow-md dark:shadow-slate-500 shadow-black/50 w-full justify-center"
            text="Đăng ký trước"
            color="white"
          />
        </>
      )}
    </div>
  );
};

export default OptionPicker;
