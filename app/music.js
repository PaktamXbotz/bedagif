"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked, tunggu user interaction...");
      }
    };

    playMusic();

    // Bila user click page baru, muzik still jalan
    const handleInteraction = () => {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
      }
    };

    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
    };
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop>
      <source src="/happy.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
