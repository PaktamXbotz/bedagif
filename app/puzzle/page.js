"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PuzzlePage() {
  const router = useRouter();
  const [tiles, setTiles] = useState([]);
  const [message, setMessage] = useState("");

  // Generate random tiles 1-9
  useEffect(() => {
    const numbers = [...Array(9).keys()].map((n) => n + 1);
    setTiles(numbers.sort(() => Math.random() - 0.5));
  }, []);

  // Swap two tiles
  const swapTiles = (i, j) => {
    const newTiles = [...tiles];
    [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
    setTiles(newTiles);

    // Check if solved
    if (newTiles.every((val, idx) => val === idx + 1)) {
      setMessage("🎉 Puzzle Completed!");
      setTimeout(() => router.push("/maze"), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🧩 Arrange 1 - 9</h1>
      <div className="grid grid-cols-3 gap-3">
        {tiles.map((num, i) => (
          <button
            key={i}
            onClick={() => {
              if (i > 0) swapTiles(i, i - 1);
              if (i < tiles.length - 1) swapTiles(i, i + 1);
            }}
            className="w-20 h-20 flex items-center justify-center bg-white text-black font-bold rounded-xl shadow-lg text-xl active:scale-95 transition"
          >
            {num}
          </button>
        ))}
      </div>
      {message && <p className="mt-6 text-2xl">{message}</p>}
    </div>
  );
}
