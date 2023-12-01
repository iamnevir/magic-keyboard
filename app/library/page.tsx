import { BackButton } from "@/components/library/back-button";
import { LibraryCanvas } from "@/components/library/library-keyboard";
import { webUrl } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
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
  const images = [
    // Front
    {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0],
      url: "https://utfs.io/f/2222ed98-a594-44f3-aff4-b219e179b1eb-a3y1nv.jpg",
      name: "brato",
    },
    // Back
    {
      position: [-0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: "https://utfs.io/f/f6a2d4ab-6ca9-4d7b-b608-7dd9ccaf9c4e-a3y1s6.jpg",
      name: "pluto",
    },
    {
      position: [0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: "https://utfs.io/f/682ad754-399c-4da3-8520-59d51abb31f7-a3y1qg.jpg",
      name: "marcus",
    },
    // Left
    {
      position: [-1.75, 0, 0.25],
      rotation: [0, Math.PI / 2.5, 0],
      url: "https://utfs.io/f/e938d64c-feb8-4d21-a350-47d5ab309261-a3y1t1.jpg",
      name: "aurelius",
    },
    {
      position: [-2.15, 0, 1.5],
      rotation: [0, Math.PI / 2.5, 0],
      url: "https://utfs.io/f/c4a6481e-00d6-4605-99ad-cc20c4c466d7-a3y1pl.jpg",
      name: "root",
    },
    {
      position: [-2, 0, 2.75],
      rotation: [0, Math.PI / 2.5, 0],
      url: "https://utfs.io/f/d76a2628-e329-49e6-b00a-d44d4b820802-a3y1m5.jpg",
      name: "sider",
    },
    // Right
    {
      position: [1.75, 0, 0.25],
      rotation: [0, -Math.PI / 2.5, 0],
      url: "https://utfs.io/f/4d23bebc-ddc6-4f30-93d5-a47190740d61-a3y1rb.jpg",
      name: "brain",
    },
    {
      position: [2.15, 0, 1.5],
      rotation: [0, -Math.PI / 2.5, 0],
      url: "https://utfs.io/f/9c97de85-7a12-4736-abf9-8d750506b3b9-a3y1n0.jpg",
      name: "skeleton",
    },
    {
      position: [2, 0, 2.75],
      rotation: [0, -Math.PI / 2.5, 0],
      url: "https://utfs.io/f/dcbedff7-337f-4c19-a53b-f53e61a186db-a3y1oq.jpg",
      name: "something",
    },
  ];
  return (
    <div className=" sm:h-full sm:w-full w-[100vw] h-[100vh]">
      <BackButton />
      <Suspense
        fallback={
          <div className=" absolute sm:left-[50%] sm:top-[50%] left-[40%] top-[40%] font-semibold w-10 h-10 dark:text-white">
            loading...
          </div>
        }
      >
        <LibraryCanvas images={images} />
      </Suspense>
    </div>
  );
};

export default LibraryPage;
