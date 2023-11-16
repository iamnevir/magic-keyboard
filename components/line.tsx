import { useLottie, useLottieInteractivity } from "lottie-react";
import line from "@/public/line.json";

const options = {
  animationData: line,
};

export const Line = () => {
  const lottieObj = useLottie(options);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0.3, 1],
        type: "seek",
        frames: [0, 50],
      },
    ],
  });

  return Animation;
};
