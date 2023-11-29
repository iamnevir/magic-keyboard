"use client";
import { api } from "@/convex/_generated/api";
import { useMusic } from "@/hooks/use-bg-music";
import { useQuery } from "convex/react";
import { ElementRef, useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const play = useMusic();
  const bgMusic = useQuery(api.musicBackground.getMusicBgs);
  const musicUrl = useQuery(api.music.getMusicById, {
    musicId: bgMusic?.music,
  });
  const ref = useRef<ElementRef<"audio">>(null);

  useEffect(() => {
    if (play.isOpen) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [play]);
  if (musicUrl === undefined) {
    return null;
  }
  if (!musicUrl) {
    return null;
  }
  return (
    <audio ref={ref} loop={play.isOpen} className=" hidden">
      <source src={musicUrl.url} type="audio/mpeg" />
    </audio>
  );
};

export default BackgroundMusic;
