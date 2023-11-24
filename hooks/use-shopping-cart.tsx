import { Id } from "@/convex/_generated/dataModel";
import { ProductCart } from "@/type";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: ProductCart[];
  addItem: (data: ProductCart) => void;
  updateItem: ({
    data,
    quantity,
  }: {
    data: ProductCart;
    quantity: number;
  }) => void;
  removeItem: (data: ProductCart) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductCart) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.productId === data.productId && item.options === data.options
        );

        if (existingItem) {
          return toast.error("Đã có sản phẩm này.");
        }

        set({ items: [...get().items, data] });
        toast.success("Đã thêm sản phẩm vào giỏ.");
      },
      updateItem: ({
        data,
        quantity,
      }: {
        data: ProductCart;
        quantity: number;
      }) => {
        try {
          const item = get().items.find((item) => item === data);
          if (!item) {
            return toast.error("Nhầm lẫn gì rồi :v");
          }
          if (quantity < 1) {
            return;
          }
          item.quantity = quantity;
          item.totalPrice = quantity * (item.price ? item.price : 0);
          set({
            items: [...get().items],
          });
        } catch (error) {
          return toast.error("Đã có sản phẩm này.");
        }
      },
      removeItem: (data: ProductCart) => {
        set({
          items: [...get().items.filter((item) => item !== data)],
        });
        toast.success("Đã xóa.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
