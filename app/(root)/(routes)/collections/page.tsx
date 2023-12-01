import CarouselCategoryList from "@/components/root/category-list";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bộ sưu tập sản phẩm",
  description: "Bộ sưu tập danh mục hàng",
};
const CollectionsPage = () => {
  return (
    <div>
      <CarouselCategoryList />
    </div>
  );
};

export default CollectionsPage;
