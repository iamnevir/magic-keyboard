"use client";
import { Canvas } from "@react-three/fiber";
import Carousel from "@/components/library/carousel";
const LibraryCanvas = () => {
  const images = [
    "http://epomaker.com/cdn/shop/files/EK68_mobile.jpg?v=1702021004&width=750",
    "https://epomaker.com/cdn/shop/files/Brick87pk.jpg?v=1700647789",
    "https://epomaker.com/cdn/shop/files/400681692188806_.pic_250x250_crop_center.jpg?v=1692222444",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/640.jpg?v=1703228097&width=750",
    "http://epomaker.com/cdn/shop/files/EK68_mobile.jpg?v=1702021004&width=750",
    "https://epomaker.com/cdn/shop/files/Brick87pk.jpg?v=1700647789",
    "https://epomaker.com/cdn/shop/files/400681692188806_.pic_250x250_crop_center.jpg?v=1692222444",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/640.jpg?v=1703228097&width=750",
    "http://epomaker.com/cdn/shop/files/EK68_mobile.jpg?v=1702021004&width=750",
    "https://epomaker.com/cdn/shop/files/Brick87pk.jpg?v=1700647789",
    "https://epomaker.com/cdn/shop/files/400681692188806_.pic_250x250_crop_center.jpg?v=1692222444",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/640.jpg?v=1703228097&width=750",
    "https://epomaker.com/cdn/shop/files/203A0038_1.jpg?v=1703138936",
    "https://epomaker.com/cdn/shop/files/9d8074b07f2eca1cf3421b3b1d7f6017.jpg?v=1703228109&width=1100",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
    "https://epomaker.com/cdn/shop/files/231109_Brick87_purple.2_250x250_crop_center.png?v=1700643903",
  ];
  return (
    <Canvas>
      <Carousel images={images} />
    </Canvas>
  );
};

export default LibraryCanvas;
