import { Doc, Id } from "@/convex/_generated/dataModel";
import { Link } from "@nextui-org/react";
import ProductItem from "./product-item";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const NavProductsDropDown = ({
  categories,
  products,
  collections,
}: {
  categories?: Doc<"category">[];
  products?: Doc<"product">[];
  collections?: Doc<"collection">[];
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className=" flex items-start lg:w-[910px] md:w-[650px] dark:bg-black dark:text-white bg-white text-black ">
      <div className="flex flex-col gap-3 w-fit p-1 ">
        {categories?.map((item, index) => (
          <Link
            onMouseEnter={() => setHover(index)}
            key={index}
            className={cn(
              " w-full  rounded-xl p-3",
              hover === index ? "dark:bg-zinc-700 bg-zinc-200" : ""
            )}
            href={`/collections/${item.slug}`}
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      {categories?.map((item, index) => {
        const col = collections
          ?.filter((f) => f.categoryId === item._id)
          .map((item) => item._id);
        const prt = products?.filter((f) =>
          FilterForCollection(f.collectionId, col ? col : [])
        );
        return <Item products={prt} show={hover === index} key={index} />;
      })}
    </div>
  );
};
function FilterForCollection(
  id: Id<"collection">,
  collectionId: Id<"collection">[]
) {
  return collectionId.some((c) => id === c);
}
const Item = ({
  show,
  products,
}: {
  show: boolean;
  products?: Doc<"product">[];
}) => {
  return (
    <ScrollArea>
      <div className={cn("flex gap-3 p-4", show ? "" : "hidden")}>
        {products?.slice(0, 3).map((item, index) => (
          <ProductItem className="mb-0" product={item} key={index} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NavProductsDropDown;
