import { Chip, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { fadeIn } from "@/lib/motion";
import { ListImage, cn, formatCurrency } from "@/lib/utils";
import { Tilt } from "@jdion/tilt-react";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RatingStar from "./rating-star";
import Image from "next/image";
import AnimateButton from "./animate-button";
import TooltipAction from "./tooltip-action";
import { Eye, ShoppingBag, Star } from "lucide-react";
import ProductSwiper from "./products/product-swiper";
import useCart from "@/hooks/use-shopping-cart";

const ProductItem = ({
  product,
  loop,
  onFilter,
  setOnFilter,
}: {
  product: Doc<"product">;
  loop?: boolean;
  onFilter?: boolean;
  setOnFilter?: (value: boolean) => void;
}) => {
  const router = useRouter();
  const cart = useCart();
  const images = ListImage({ product });
  const isMobile = window.screen.width <= 768;
  const [bg, setBg] = useState(images ? images[0] : "");
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (onFilter) {
      setBg(images ? images[0] : "");
    }
    if (setOnFilter) {
      setOnFilter(false);
    }
  }, [onFilter, images, setOnFilter]);

  const [active, setActive] = useState(0);

  const [open, setOpen] = useState(false);
  const reviews = useQuery(api.review.getReviewsByProduct, {
    productId: product._id,
  });
  const ratingList = reviews?.map((review) => review.rating);
  const rating =
    ratingList !== undefined
      ? ratingList!.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) / ratingList!.length
      : null;

  const imageOption = product.options ? product.options[0].option : null;
  const addToCart = () => {
    const keys = product.options?.map((i) => i.name);
    const values = product.options?.map((i) => i.option[0].name);
    const list: { key: string; value: string }[] | undefined = keys?.map(
      (key, index) => ({ key, value: values![index] })
    );
    if (list) {
      const option = product.options![0].option.find(
        (o) => o.name === list[0].value
      );

      cart.addItem({
        productId: product._id,
        name: product.name,
        options: list,
        price: option?.price,
        totalPrice: option?.price ? option?.price : 0,
        quantity: 1,
        image: option?.image ? option?.image : product.images![0],
      });
    }
  };
  return (
    <>
      {!isMobile ? (
        <Modal size="3xl" isOpen={open} onOpenChange={() => setOpen(false)}>
          <ModalContent>
            <>
              <ModalBody>
                <ProductSwiper
                  className="w-full ml-8"
                  classNameUnder="w-[690px]"
                  product={product}
                />
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      ) : null}

      <div className=" flex flex-col justify-start items-center w-[250ppx] h-[450px] gap-3 ">
        <Tilt>
          <motion.div
            initial="hidden"
            animate={loop ? "" : "visible"}
            whileInView={loop ? "visible" : ""}
            variants={fadeIn("up", "spring", 0.1, 0.1)}
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => router.push(`/products/${product._id}`)}
            className={cn(
              `relative  sm:w-[250px] sm:h-[250px] w-[80dvw] h-[30dvh] bg-cover bg-shrink-0 cursor-pointer rounded-2xl transition-all duration-1000`
            )}
            onMouseEnter={() => {
              setHover(true);
              setBg(images ? images[0] : "");
            }}
            onMouseLeave={() => {
              setHover(false);
              setBg(images ? images[1] : "");
            }}
          >
            <div className=" sm:flex absolute hidden w-full h-full">
              {product.isSale ? (
                <div className=" absolute left-2 top-2 ">
                  <Chip className="h-5 text-white bg-green-500/50">Sale</Chip>
                </div>
              ) : null}

              <div
                className={cn(
                  " absolute left-0 bottom-2  w-full px-6 duration-500",
                  !hover ? "translate-y-10 opacity-0" : ""
                )}
              >
                <AnimateButton
                  text="Select options"
                  onClick={() => router.push(`/products/${product._id}`)}
                  className=" h-10"
                />
              </div>
              <div
                className={cn(
                  " absolute right-3 space-y-3 top-3 duration-500",
                  !hover ? "translate-x-10 opacity-0" : ""
                )}
              >
                <TooltipAction tooltip="Add to wishlist">
                  <Star className=" w-3 h-3 group-hover:text-white" />
                </TooltipAction>
                <TooltipAction onClick={addToCart} tooltip="Add to cart">
                  <ShoppingBag className=" group-hover:text-white w-3 h-3" />
                </TooltipAction>
                <TooltipAction
                  onClick={() => setOpen(true)}
                  tooltip="Quick view"
                >
                  <Eye className=" group-hover:text-white w-3 h-3" />
                </TooltipAction>
              </div>
            </div>
          </motion.div>
        </Tilt>
        <motion.div
          initial="hidden"
          animate={loop ? "" : "visible"}
          whileInView={loop ? "visible" : ""}
          variants={fadeIn("left", "spring", 0.1, 1)}
          className=" flex flex-col items-center text-center w-full gap-1"
        >
          <span className="text-xs font-semibold uppercase text-zinc-400">
            {product.producer}
          </span>
          <p className="block text-base mb-[5px] leading-normal sf__pcard-name font-semibold truncate-lines hover:text-color-secondary">
            {product.name}
          </p>
          {!rating ? (
            <div className="flex items-center gap-1 whitespace-nowrap">
              {" "}
              <RatingStar rating={rating} />
              <span className=" text-xs font-semibold">No Reviews</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <RatingStar rating={rating} />
              <span className=" text-xs font-semibold">
                {ratingList?.length} Reviews
              </span>
            </div>
          )}
          <div className=" flex items-center gap-3">
            <p className=" font-semibold text-sm">
              {formatCurrency(product.price!)}
            </p>
            <p
              className={cn(
                " font-semibold text-sm ",
                product.isSale ? "text-default-400 line-through" : ""
              )}
            >
              {product.isSale ? formatCurrency(product.salePrice!) : null}
            </p>
          </div>

          <div className=" flex items-center gap-1">
            {imageOption?.slice(0, 4).map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setActive(index);
                  setBg(item.image ? item.image : "");
                }}
                className={cn(
                  "  cursor-pointer border-1",
                  active === index
                    ? "dark:border-white border-black"
                    : "border-none"
                )}
              >
                <Image
                  src={item.image ? item.image : ""}
                  alt="image"
                  width={50}
                  height={30}
                  className=" w-[50px] h-[30px] object-contain "
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductItem;
