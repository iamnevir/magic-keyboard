import { useEffect } from "react";
import { useSwiper } from "swiper/react";

export const ChangeImage = ({ index }: { index?: number }) => {
  const swiper = useSwiper();
  useEffect(() => {
    if (index) {
      if (index !== -1) {
        swiper.slideTo(index);
      }
    } else {
      swiper.slideTo(0);
    }
  }, [index, swiper]);
  return null;
};
