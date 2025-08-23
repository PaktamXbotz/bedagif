"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, user interaction needed");
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/cinnamon.mp3"
      autoPlay
      loop
      hidden
    />
  );
}
