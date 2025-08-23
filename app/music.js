"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      // sekali je trigger, lepas tu remove
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/cinnamon.mp3"
      loop
      hidden
    />
  );
}
