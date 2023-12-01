import ShoppingCartDrawer from "@/components/shopping-cart-drawer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sm:mt-[70px] mt-3 sm:px-20 px-1 w-full h-full">
      <ShoppingCartDrawer />
      {children}
    </div>
  );
}
