"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SIZE = 5; // 5x5 maze

export default function MazePage() {
  const router = useRouter();
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const exit = { x: SIZE - 1, y: SIZE - 1 };

  // Key control
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") move(0, -1);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const move = (dx, dy) => {
    setPlayer((prev) => {
      const nx = Math.max(0, Math.min(SIZE - 1, prev.x + dx));
      const ny = Math.max(0, Math.min(SIZE - 1, prev.y + dy));
      if (nx === exit.x && ny === exit.y) {
        setTimeout(() => router.push("/cake"), 1000);
      }
      return { x: nx, y: ny };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-green-400 to-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-4">🌀 Maze Game</h1>
      <p className="mb-4">Reach the 🎂 at bottom-right!</p>

      {/* Maze grid */}
      <div className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 60px)` }}>
        {[...Array(SIZE)].map((_, y) =>
          [...Array(SIZE)].map((_, x) => {
            const isPlayer = player.x === x && player.y === y;
            const isExit = exit.x === x && exit.y === y;
            return (
              <div
                key={`${x}-${y}`}
                className={`w-14 h-14 flex items-center justify-center rounded-lg border-2
                  ${isPlayer ? "bg-yellow-300 text-black font-bold" :
                    isExit ? "bg-pink-500" :
                    "bg-white/20"}`}
              >
                {isPlayer ? "🧑" : isExit ? "🎂" : ""}
              </div>
            );
          })
        )}
      </div>

      {/* Controls for mobile */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button onClick={() => move(0, -1)} className="col-span-3 py-2 bg-white/30 rounded">⬆️</button>
        <button onClick={() => move(-1, 0)} className="py-2 bg-white/30 rounded">⬅️</button>
        <button onClick={() => move(0, 1)} className="py-2 bg-white/30 rounded">⬇️</button>
        <button onClick={() => move(1, 0)} className="py-2 bg-white/30 rounded">➡️</button>
      </div>
    </div>
  );
}
