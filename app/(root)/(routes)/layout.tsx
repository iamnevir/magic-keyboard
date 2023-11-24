import ShoppingCartDrawer from "@/components/shopping-cart-drawer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[70px] w-full h-full"> {children}</div>;
}
