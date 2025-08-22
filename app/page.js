"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  // Trigger confetti
  const launchConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  // Auto play music (public/birthday.mp3)
  useEffect(() => {
    const audio = new Audio("/birthday.mp3");
    audio.play().catch(() => {
      console.log("Autoplay blocked, user must click first.");
    });
  }, []);

  return (
    <div className="container">
      <h1>🎉 Happy Birthday! 🎂</h1>
      <p>Semoga panjang umur & murah rezeki ✨</p>
      <img src="/cake.gif" alt="Birthday Cake" width="200" />
      <br />
      <button onClick={launchConfetti}>Celebrate 🎊</button>
    </div>
  );
}
