import { Id } from "./convex/_generated/dataModel";

export type ProductCart = {
  productId: Id<"product">;
  image?: string;
  name: string;
  options?: { key: string; value: string }[];
  price?: number;
  totalPrice?: number;
  quantity: number;
};
