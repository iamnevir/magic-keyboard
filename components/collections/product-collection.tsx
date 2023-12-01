"use client";
import { SliderValue } from "@nextui-org/react";
import CollectionFilter from "./collection-filter";
import CollectionProduct from "./collection-product";
import { useState } from "react";

const ProductCollection = ({
  slug,
  isAll,
}: {
  slug: string;
  isAll?: boolean;
}) => {
  const [listId, setListId] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const onLocChange = (value: string[]) => {
    setListId(value);
  };
  const [price, setPrice] = useState<SliderValue>();
  return (
    <div className="">
      <div className=" flex items-start overflow-auto">
        <CollectionFilter
          onBrandChange={setBrand}
          onPriceChange={setPrice}
          onLocChange={onLocChange}
          slug={slug}
          isAll={isAll}
        />
        <CollectionProduct
          brandFilter={brand}
          priceFilter={price}
          collectionIdList={listId}
        />
      </div>
    </div>
  );
};

export default ProductCollection;
