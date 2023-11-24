import loading from "@/public/loading.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

const Intro = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = window.screen.width <= 768;
  useEffect(() => {
    if (!isMobile) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2700);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isMobile]);
  if (isLoading) {
    return (
      <div className="h-[100dvh] w-[100dvw] bg-white overflow-hidden">
        <Lottie animationData={loading} className="-mt-[30dvh]" />
      </div>
    );
  }
  return null;
};

export default Intro;
