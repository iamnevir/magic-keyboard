import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Tooltip } from "@nextui-org/react";
import { useQuery } from "convex/react";
import GenerateHtml from "@/lib/json-to-html";
import OptionPicker from "./option-picker";
import RatingStar from "../rating-star";
import { ArrowUpDown, HelpCircle, Share2 } from "lucide-react";
const ProductPicker = ({
  product,
  onOptionChange,
}: {
  product: Doc<"product">;
  onOptionChange: (v: { key: string; value: string }) => void;
}) => {
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

  return (
    <div className="flex flex-col sm:pr-20 sm:pl-14 px-1 overflow-auto">
      <div className="flex justify-between w-full items-center relative md:pr-12 pt-2">
        <h1 className="text-2xl md:text-3xl md:leading-[42px] pr-2 font-extrabold">
          {product.name}
        </h1>
        <Tooltip
          classNames={{
            base: [
              // arrow color
              "before:bg-neutral-400 dark:before:bg-white rounded-none",
            ],
            content: [
              "py-1 px-4 shadow-xl font-semibold",
              "text-black bg-gradient-to-br from-white to-neutral-300",
            ],
          }}
          placement="left"
          content="Add to wishlist"
          delay={0}
          closeDelay={0}
          motionProps={{
            variants: {
              exit: {
                opacity: 0,
                transition: {
                  duration: 0.1,
                  ease: "easeIn",
                },
              },
              enter: {
                opacity: 1,
                transition: {
                  duration: 0.15,
                  ease: "easeOut",
                },
              },
            },
          }}
        >
          <div className=" rounded-full  shadow-inner dark:shadow-white shadow-black border-1 p-3 group hover:bg-[#1A2FFB] hover:border-[#1A2FFB] hover:scale-110 duration-500">
            <svg
              className="w-[20px] h-[20px] group-hover:text-white duration-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg>
          </div>
        </Tooltip>
      </div>
      <div className="flex items-center gap-3">
        {reviews !== undefined && reviews.length > 0 ? (
          <>
            <RatingStar rating={rating} />
            <span>{reviews.length} reviews</span>
          </>
        ) : (
          <span className="whitespace-nowrap">No reviews.</span>
        )}
      </div>
      <div className=" mt-2 prose-headings:text-sm prose-li:font-semibold prose-ul:mt-2">
        <GenerateHtml className=" text-xs" json={product.description} />
      </div>
      <div className="mt-3">
        <OptionPicker onOptionChange={onOptionChange} product={product} />
      </div>
      <div className="flex items-start mt-3 flex-col gap-3">
        <div className="flex items-center gap-4 mt-2">
          <div className=" sm:w-12 w-24 text-blue-800">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="shipping-fast"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M280 192c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240zm352 192h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H113.4C86.2 32 64 52.9 64 78.6V96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H96V78.6c0-8.1 7.8-14.6 17.4-14.6h253.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6C193 364.7 170 352 144 352c-18.1 0-34.6 6.2-48 16.4V288H64v144c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-488 96c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm272-320h44.1c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c.8.8 1.1 1.9 1.8 2.8H416V160zm80 320c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-96h-16.4C545 364.7 522 352 496 352s-49 12.7-63.6 32H416v-96h160v96zM256 248v-16c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8z"
              ></path>
            </svg>
          </div>
          <div className="">
            <h3 className=" font-bold">
              Free standard shipping to most countries
            </h3>
            <div className=" text-sm font-medium">
              Enjoy free shipping to most countries*. Please refer to our
              shipping FAQ to see if you apply.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className=" sm:w-12 w-28 text-blue-800">
            <svg
              id="fi_10428795"
              enable-background="new 0 0 64 64"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  fill="currentColor"
                  d="m10 16v22c0 .3.1.6.2.8.3.6 6.5 13.8 21 20h.1.1c.2 0 .3.1.5.1s0 0 0 0c.2 0 .3 0 .5-.1h.1.1c14.5-6.2 20.8-19.4 21-20 .1-.3.2-.5.2-.8v-22c0-.9-.6-1.7-1.5-1.9-7.6-1.9-19.3-9.6-19.4-9.7-.1-.1-.2-.1-.4-.2-.1 0-.1 0-.2-.1-.1 0-.1 0-.2 0s-.2 0-.3 0h-.1c-.1 0-.2 0-.2 0h-.1c-.1 0-.2.1-.3.1-.1.1-.2.1-.4.2s-11.8 7.8-19.4 9.7c-.7.2-1.3 1-1.3 1.9zm4 1.5c6.7-2.1 15-7.2 18-9.1 3 1.9 11.3 7 18 9.1v20c-1.1 2.1-6.7 12.1-18 17.3-11.3-5.2-16.9-15.2-18-17.3z"
                ></path>
                <path
                  fill="currentColor"
                  d="m28.6 38.4c.4.4.9.6 1.4.6s1-.2 1.4-.6l9.9-9.9c.8-.8.8-2 0-2.8s-2-.8-2.8 0l-8.5 8.5-4.5-4.5c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="">
            <h3 className=" font-bold">7-Day Return Policy</h3>
            <div className=" text-sm font-medium">
              You may return any non-customized and non-sales product that is
              sealed, within the 7 days upon receiving it.
            </div>
          </div>
        </div>
        <div className=" flex items-center space-x-7 p-1">
          <div className=" flex items-center font-semibold text-sm gap-2">
            <ArrowUpDown className=" w-5 h-5 text-blue-700" /> Compare
          </div>
          <div className=" flex items-center font-semibold text-sm gap-2">
            <HelpCircle className=" w-5 h-5 text-blue-700" /> Ask a question
          </div>
          <div className=" flex items-center font-semibold text-sm gap-2">
            <Share2 className=" w-5 h-5 text-blue-700" /> Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
