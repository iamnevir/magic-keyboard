import { Doc } from "@/convex/_generated/dataModel";
import { fadeIn } from "@/lib/motion";
import { ListImage, cn, formatCurrency } from "@/lib/utils";
import { Tilt } from "@jdion/tilt-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductItem = ({ product }: { product: Doc<"product"> }) => {
  const router = useRouter();

  const images = ListImage({ product });

  const [bg, setBg] = useState(images ? images[0] : "");
  return (
    <Tilt>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn("up", "spring", 0.1, 0.1)}
        style={{ backgroundImage: `url(${bg})` }}
        onClick={() => router.push(`/products/${product._id}`)}
        className={cn(
          `relative sm:w-[350px] h-[350px] w-full bg-cover bg-shrink-0 cursor-pointer rounded-2xl transition-all duration-1000`
        )}
      >
        <div
          onMouseEnter={() => {
            setBg(images ? images[0] : "");
          }}
          onMouseLeave={() => {
            setBg(images ? images[1] : "");
          }}
        >
          <div className="absolute bg-center inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] ">
            <span className="text-xs font-semibold uppercase text-violet-300">
              {product.producer}
            </span>
            <p className="my-2 text-2xl font-bold">{product.name}</p>
            <p className="text-lg text-slate-300">
              {" "}
              {formatCurrency(product.price!)}
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default ProductItem;
