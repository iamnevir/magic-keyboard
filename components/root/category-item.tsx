import { Doc } from "@/convex/_generated/dataModel";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@jdion/tilt-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
const CategoryItem = ({ category }: { category: Doc<"category"> }) => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/collections/${category.slug}`)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeIn("up", "spring", 0.2, 0.5)}
      key={category._id}
      className="group cursor-pointer relative sm:h-[400px] sm:w-[400px] h-[300px] w-[300px]  overflow-hidden bg-neutral-200"
    >
      <Image
        alt="collection"
        src={category.imageUrl ? category.imageUrl : ""}
        fill
        priority
        sizes="(min-width: 768px) 100dvw, 33dvw"
        style={{ objectFit: "cover" }}
        className="group-hover:scale-110 duration-500"
      />

      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl font-black uppercase text-white backdrop-blur-lg">
          {category.name}
        </p>
      </div>
    </motion.div>
  );
};
export default CategoryItem;
