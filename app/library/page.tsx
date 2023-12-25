import LibraryCanvas from "@/components/library/library-canvas";
import LibraryOverLay from "@/components/library/library-overlay";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Magic Keyboard - Library",
  description: "Thứ ma thuật kì lạ mang đến trải nghiệm phím cơ số một.",
  openGraph: {
    siteName: "Magic Keyboard",
    url: `${webUrl}/library`,
    title: `Magic Keyboard - Library`,
    description: `Thư viện 3D - Những mẫu bàn phím ma thuật kì dị.`,
    type: "website",
    images: [
      "https://utfs.io/f/c70f383e-32c1-4a32-a184-7910589422b5-66gey4.png",
    ],
  },
};
const LibraryPage = () => {
  return (
    <div className=" w-[100vw] h-[100vh] relative overflow-hidden">
      <LibraryOverLay />
      <LibraryCanvas />
    </div>
  );
};

export default LibraryPage;
