import FacebookMessage from "@/components/facebook-message";
import dynamic from "next/dynamic";
const NavbarPage = dynamic(() => import("@/components/navbar"), { ssr: false });
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPage />
      {children}
      <FacebookMessage />
    </>
  );
}
