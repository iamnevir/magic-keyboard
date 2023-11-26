import { api } from "@/convex/_generated/api";
import {
  Button,
  CircularProgress,
  Select,
  SelectItem,
  Selection,
  Skeleton,
  SliderValue,
} from "@nextui-org/react";
import { usePaginatedQuery, useQuery } from "convex/react";
import ProductItem from "../product-item";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useEffect, useState } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import slugify from "react-slugify";
import { fadeIn } from "@/lib/motion";
import LoadMore from "./load-more";
const ProductCollection = ({
  collectionIdList,
  priceFilter,
  brandFilter,
}: {
  collectionIdList: string[];
  brandFilter: string[];
  priceFilter?: SliderValue;
}) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.product.getMoreProducts,
    {},
    { initialNumItems: 12 }
  );
  const [onFilter, setOnFilter] = useState(false);
  const [products, setProducts] = useState<Doc<"product">[]>(results!);
  useEffect(() => {
    if (collectionIdList.length > 0) {
      if (results)
        setProducts(
          [...results!].filter((item) =>
            collectionIdList.includes(item.collectionId)
          )
        );
    } else if (brandFilter.length > 0) {
      if (results)
        setProducts(
          [...results!].filter((item) =>
            brandFilter.includes(slugify(item.producer!))
          )
        );
    } else if (priceFilter && Array.isArray(priceFilter)) {
      if (results)
        setProducts(
          [...results!].filter(
            (item) =>
              item.price! <= priceFilter[1] && item.price! >= priceFilter[0]
          )
        );
    } else {
      setProducts(results!);
    }
  }, [collectionIdList, results, priceFilter, brandFilter]);
  const filters = [
    {
      value: "asc",
      label: "Cũ nhất",
    },
    {
      value: "desc",
      label: "Mới nhất",
    },
    {
      value: "low",
      label: "Giá thấp nhất",
    },
    {
      value: "high",
      label: "Giá cao nhất",
    },
    {
      value: "selling",
      label: "Bán chạy",
    },
    {
      value: "az",
      label: "A-Z",
    },
    {
      value: "za",
      label: "Z-A",
    },
  ];
  const onSelectionChange = (keys: string) => {
    if (keys === "za") {
      setProducts([...products!].sort((a, b) => b.name.localeCompare(a.name)));
    }
    if (keys === "az") {
      setProducts([...products!].sort((a, b) => a.name.localeCompare(b.name)));
    }
    if (keys === "desc") {
      setProducts(
        [...products!].sort((a, b) => a._creationTime - b._creationTime)
      );
    }
    if (keys === "asc") {
      setProducts(
        [...products!].sort((a, b) => b._creationTime - a._creationTime)
      );
    }
    if (keys === "low") {
      setProducts([...products!].sort((a, b) => a.price! - b.price!));
    }
    if (keys === "high") {
      setProducts([...products!].sort((a, b) => b.price! - a.price!));
    }
    setOnFilter(true);
  };
  if (status === "LoadingFirstPage") {
    return (
      <div className="max-w-[300px] w-full ml-20 mt-20 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-full space-y-5 px-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn("left", "spring", 0.1, 1)}
          className="flex items-center justify-between"
        >
          <Select
            size="sm"
            label="Sắp xếp"
            onChange={(e: any) => onSelectionChange(e.target.value)}
            className="sm:max-w-xs max-w-[200px]  ml-auto"
            placeholder="All"
          >
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </Select>
        </motion.div>
        <div className=" grid lg:grid-cols-3 xl:grid-cols-4  sm:grid-cols-2 grid-cols-1 items-center gap-x-6">
          {products?.map((item, index) => (
            <div key={index}>
              <ProductItem
                onFilter={onFilter}
                setOnFilter={setOnFilter}
                product={item}
              />
            </div>
          ))}
        </div>{" "}
        {status === "CanLoadMore" ? (
          <LoadMore loadMore={() => loadMore(12)} />
        ) : null}
      </div>
    </>
  );
};

export default ProductCollection;
