import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Slider,
  SliderValue,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import BrandFilter from "./brand-filter";
import { fadeIn } from "@/lib/motion";
import { motion } from "framer-motion";
const getCollections = (categoryId: Id<"category">) =>
  useQuery(api.collection.getCollectionsByCategory, {
    categoryId,
  });
const collectionsList = () => useQuery(api.collection.getCollections);
const CollectionFilter = ({
  categoryId,
  onLocChange,
  onPriceChange,
  onBrandChange,
  isAll,
}: {
  categoryId: Id<"category">;
  onLocChange: (value: string[]) => void;
  onPriceChange: (v: SliderValue) => void;
  onBrandChange: (value: string[]) => void;
  isAll?: boolean;
}) => {
  const collections = isAll ? collectionsList() : getCollections(categoryId);
  const [brandOpen, setBrandOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const isMobile = window.screen.width <= 768;
  return (
    <>
      <div className=" h-full sm:flex sm:flex-col hidden sm:w-[27%] sm:p-4 space-y-5">
        <motion.div
          className=" space-y-5"
          initial="hidden"
          animate="visible"
          variants={fadeIn("right", "spring", 0.1, 1)}
        >
          {" "}
          <span className=" font-semibold text-2xl flex items-center">Lọc</span>
          <Card>
            <CardBody>
              <CheckboxGroup
                onValueChange={onLocChange}
                color="danger"
                label="Bộ sưu tập"
              >
                {collections
                  ? collections?.map((item) => (
                      <Checkbox value={item._id}>{item.name}</Checkbox>
                    ))
                  : null}
              </CheckboxGroup>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn("right", "spring", 0.3, 1)}
        >
          {" "}
          <Card>
            <CardBody>
              <Slider
                label="Giá"
                step={100000}
                minValue={0}
                color="success"
                maxValue={5000000}
                defaultValue={[100000, 2000000]}
                onChange={onPriceChange}
                formatOptions={{ style: "currency", currency: "VND" }}
                className="max-w-xs"
              />{" "}
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn("right", "spring", 0.5, 1)}
        >
          <Card>
            <CardHeader className=" flex items-center justify-between">
              <div className=" font-semibold">Hãng</div>
              {brandOpen ? (
                <ChevronDown
                  className=" cursor-pointer"
                  onClick={() => setBrandOpen(false)}
                />
              ) : (
                <ChevronUp
                  className=" cursor-pointer"
                  onClick={() => setBrandOpen(true)}
                />
              )}
            </CardHeader>

            <CardBody>
              <div
                className={cn(
                  " translate-y-5 transition-all duration-500",
                  brandOpen ? "h-0" : "-translate-y-3"
                )}
              >
                <BrandFilter onChange={onBrandChange} />
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
      {isMobile ? (
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="h-10 left-5 flex items-center mt-1 absolute"
              variant="bordered"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn("right", "spring", 0.1, 1)}
                className="flex items-center "
              >
                Lọc <Filter className="" />
              </motion.div>{" "}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter"
            disallowEmptySelection={false}
            selectionMode="none"
            hideSelectedIcon
            closeOnSelect={false}
          >
            <DropdownItem key="price">
              <Card>
                <CardBody>
                  <Slider
                    label="Giá"
                    step={100000}
                    minValue={0}
                    color="success"
                    maxValue={5000000}
                    defaultValue={[100000, 2000000]}
                    onChange={onPriceChange}
                    formatOptions={{ style: "currency", currency: "VND" }}
                    className="max-w-xs"
                  />{" "}
                </CardBody>
              </Card>
            </DropdownItem>
            <DropdownItem key="collection">
              <Card>
                <CardHeader className=" flex items-center justify-between">
                  <div className=" font-semibold">Bộ sưu tập</div>
                  {collectionOpen ? (
                    <ChevronDown
                      className=" cursor-pointer"
                      onClick={() => setCollectionOpen(false)}
                    />
                  ) : (
                    <ChevronUp
                      className=" cursor-pointer"
                      onClick={() => setCollectionOpen(true)}
                    />
                  )}
                </CardHeader>

                <CardBody>
                  <div
                    className={cn(
                      " translate-y-5 transition-all duration-500",
                      collectionOpen ? "h-0" : "-translate-y-3"
                    )}
                  >
                    <CheckboxGroup onValueChange={onLocChange} color="success">
                      {collections
                        ? collections?.map((item) => (
                            <Checkbox value={item._id}>{item.name}</Checkbox>
                          ))
                        : null}
                    </CheckboxGroup>
                  </div>
                </CardBody>
              </Card>
            </DropdownItem>

            <DropdownItem key="brand">
              <Card>
                <CardHeader className=" flex items-center justify-between">
                  <div className=" font-semibold">Hãng</div>
                  {brandOpen ? (
                    <ChevronDown
                      className=" cursor-pointer"
                      onClick={() => setBrandOpen(false)}
                    />
                  ) : (
                    <ChevronUp
                      className=" cursor-pointer"
                      onClick={() => setBrandOpen(true)}
                    />
                  )}
                </CardHeader>

                <CardBody>
                  <div
                    className={cn(
                      " translate-y-5 transition-all duration-500",
                      brandOpen ? "h-0" : "-translate-y-3"
                    )}
                  >
                    <BrandFilter onChange={onBrandChange} />
                  </div>
                </CardBody>
              </Card>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </>
  );
};

export default CollectionFilter;
