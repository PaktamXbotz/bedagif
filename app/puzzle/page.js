"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const PUZZLE_SIZE = 3;
const IMAGE_SIZE = 300;
const TILE_SIZE = IMAGE_SIZE / PUZZLE_SIZE;

// Utility untuk shuffle
function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function isSolved(tiles) {
  for (let i = 0; i < 8; i++) if (tiles[i] !== i + 1) return false;
  return tiles[8] === 0;
}

export default function PuzzlePage() {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);
    const router = useRouter();


  // Setup puzzle
  useEffect(() => {
    let arr;
    do {
      arr = shuffle([1,2,3,4,5,6,7,8,0]);
    } while (isSolved(arr));
    setTiles(arr);
  }, []);

  function move(idx) {
    if (solved) return;
    const zeroIdx = tiles.indexOf(0);
    const canMove = [
      zeroIdx - 3, zeroIdx + 3,
      zeroIdx % 3 !== 0 ? zeroIdx - 1 : -1,
      zeroIdx % 3 !== 2 ? zeroIdx + 1 : -1
    ];
    if (canMove.includes(idx)) {
  const newTiles = tiles.slice();
  [newTiles[zeroIdx], newTiles[idx]] = [newTiles[idx], newTiles[zeroIdx]];
  setTiles(newTiles);

  if (isSolved(newTiles)) {
    setSolved(true);
    // hanya redirect bila solved
    setTimeout(() => router.push("/maze"), 1500);
  }
}

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🌷 Sliding Puzzle: Tulips</h1>
      <p style={styles.text}>Susun sampai gambar bunga tulip siap!</p>
      <div style={styles.puzzle}>
        {tiles.map((v, i) => {
          if (v === 0) return null; // Slot kosong tak render tile
          // Posisi semasa
          const x = (i % 3) * TILE_SIZE;
          const y = Math.floor(i / 3) * TILE_SIZE;
          // Crop image ikut VALUE tile (bukan index slot)
          const bgX = -((v-1) % 3) * TILE_SIZE;
          const bgY = -Math.floor((v-1) / 3) * TILE_SIZE;
          return (
            <div
              key={v}
              style={{
                ...styles.tile,
                backgroundImage: `url("/tulips.jpg")`,
                backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
                backgroundPosition: `${bgX}px ${bgY}px`,
                transform: `translate(${x}px, ${y}px)`,
                transition: "transform 0.3s cubic-bezier(.36,.07,.19,.97)"
              }}
              onClick={() => move(i)}
            >
              {/* Optional: nombor hint */}
              <span style={styles.numHint}>{v}</span>
            </div>
          );
        })}
      </div>
      {solved && (
        <div style={styles.winBox}>
          <img src="/success.gif" width={80} />
          <p style={styles.success}>Tahniah! Puzzle siap 🌷</p>
        </div>
      )}
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fbc2eb 0%, #f9c6d0 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 32, marginBottom: 10, color: "#b35b7a"
  },
  text: {
    color: "#b35b7a", marginBottom: 12, fontSize: 18
  },
  puzzle: {
    position: "relative",
    width: 300,
    height: 300,
    margin: "24px 0"
  },
  tile: {
    position: "absolute",
    width: 100, height: 100,
    borderRadius: 10,
    backgroundColor: "#fff",
    border: "2px solid #f8a5c2",
    boxSizing: "border-box",
    display: "flex", alignItems: "center", justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    overflow: "hidden"
  },
  numHint: {
    position: "absolute",
    bottom: 8,
    right: 12,
    background: "#fff6faee",
    color: "#b35b7a",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: 18,
    padding: "2px 8px",
    boxShadow: "0 2px 8px #f8a5c233"
  },
  winBox: {
    marginTop: 20, textAlign: "center"
  },
  success: {
    color: "#b35b7a",
    fontWeight: "bold",
    marginTop: 8
  }
};
