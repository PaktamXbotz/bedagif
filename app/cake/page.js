"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function CakePage() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    // trigger confetti sekali je bila masuk page
    confetti();
    // generate balloons hanya kat client
    const randomBalloons = Array.from({ length: 10 }).map(() => ({
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 90}%`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setBalloons(randomBalloons);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative overflow-hidden">
      <h1 className="text-5xl font-bold text-pink-700 mb-4">
        🎂 Happy Birthday! 🎂
      </h1>
      <p className="text-xl text-pink-600 mb-8">Enjoy your special day 💖</p>

      {/* Floating balloons */}
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-bounce"
          style={{
            left: b.left,
            top: b.top,
            animationDuration: b.duration,
          }}
        >
          🎈
        </div>
      ))}
    </div>
  );
}
