"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const launchConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    const audio = new Audio("/cinnamon.mp3");
    audio.play().catch(() => {
      console.log("Autoplay blocked, user must click first.");
    });
  }, []);

  return (
    <div className="container">
      <h1>🎉 Happy Birthday! 🎂</h1>
      <p>Semoga panjang umur & murah rezeki ✨</p>
      <img src="/cakecute.gif" alt="Birthday Cake" width="200" />
      <br />
      <button onClick={launchConfetti}>Celebrate 🎊</button>
      <br />
      <a href="/password">
        <button style={{marginTop: 20}}>Masuk Birthday Gate 🔒</button>
      </a>
    </div>
  );
}
