import { ElementRef, useEffect, useRef } from "react";

const BackgroundMusic = ({ isPlay }: { isPlay: boolean }) => {
  const ref = useRef<ElementRef<"audio">>(null);

  useEffect(() => {
    if (isPlay) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlay]);
  return (
    <audio
      ref={ref}
      autoPlay={isPlay ? true : false}
      loop={isPlay ? true : false}
      className=" hidden"
    >
      <source src="/music.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundMusic;
