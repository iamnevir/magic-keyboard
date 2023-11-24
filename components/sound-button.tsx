import { ElementRef, useEffect, useRef } from "react";

const SoundButton = ({ isPlay }: { isPlay: boolean }) => {
  const ref = useRef<ElementRef<"audio">>(null);
  useEffect(() => {
    if (isPlay) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlay]);
  return (
    <audio ref={ref}>
      <source src="/button-hover.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default SoundButton;
