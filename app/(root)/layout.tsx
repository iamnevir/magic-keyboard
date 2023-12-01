import FacebookMessage from "@/components/facebook-message";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const NavbarPage = dynamic(() => import("@/components/navbar"), { ssr: false });
export const metadata: Metadata = {
  title: "Magic Keyboard",
  description: "Thứ ma thuật kì lạ mang đến trải nghiệm phím cơ số một.",
  openGraph: {
    siteName: "Magic Keyboard",
    url: `${webUrl}`,
    title: `Magic Keyboard`,
    description: `Thứ ma thuật kì lạ mang đến trải nghiệm phím cơ số một.`,
    type: "website",
    images: [
      "https://files.edgestore.dev/eqbzivk0rbhgn1q7/publicFiles/_public/34b7b5d0-b95e-42a9-aac1-5a00292e37f2.jpg",
    ],
  },
};
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
