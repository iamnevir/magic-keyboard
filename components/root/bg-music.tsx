"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ElementRef, useEffect, useRef } from "react";

const BackgroundMusic = ({ isPlay }: { isPlay: boolean }) => {
  const bgMusic = useQuery(api.musicBackground.getMusicBgs);
  const musicUrl = useQuery(api.music.getMusicById, {
    musicId: bgMusic?.music,
  });
  const ref = useRef<ElementRef<"audio">>(null);

  useEffect(() => {
    if (isPlay) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlay]);
  if (musicUrl === undefined) {
    return null;
  }
  if (!musicUrl) {
    return null;
  }
  return (
    <audio ref={ref} loop={isPlay} className=" hidden">
      <source src={musicUrl.url} type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundMusic;
