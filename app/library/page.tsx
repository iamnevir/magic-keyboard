"use client";
import { LibraryCanvas } from "@/components/library/library-keyboard";
import TransitionPage from "@/components/transition-page";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const LibraryPage = () => {
  const router = useRouter();
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
    <div className=" h-full w-full">
      <div
        className="absolute dark:text-white left-10 top-10 w-10 h-5 z-50 cursor-pointer "
        onClick={() => router.push("/")}
      >
        back
      </div>
      <Suspense
        fallback={
          <div className=" absolute left-[50%] top-[50%] font-semibold w-10 h-10 dark:text-white">
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
