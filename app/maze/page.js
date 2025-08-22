"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Maze grid: 1 = wall, 0 = path, H = Home, B = Bear
const initialMaze = [
  [1,1,1,1,1,1,1],
  [1,0,0,0,1,'H',1],
  [1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1],
  [1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
];

const startBear = { x: 5, y: 4 }; // row, col
const home = { x: 1, y: 5 };

export default function MazePage() {
  const router = useRouter();
  const [bear, setBear] = useState(startBear);
  const [win, setWin] = useState(false);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const handle = (e) => {
      if (win) return;
      let dx = 0, dy = 0;
      if (e.key === "ArrowUp") dx = -1;
      if (e.key === "ArrowDown") dx = 1;
      if (e.key === "ArrowLeft") dy = -1;
      if (e.key === "ArrowRight") dy = 1;
      move(dx, dy);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
    // eslint-disable-next-line
  }, [bear, win]);

  function move(dx, dy) {
    const x = bear.x + dx, y = bear.y + dy;
    if (!win &&
      initialMaze[x] && initialMaze[x][y] !== undefined &&
      initialMaze[x][y] !== 1
    ) {
      setAnim(true);
      setTimeout(() => setAnim(false), 200);
      setBear({ x, y });
      if (x === home.x && y === home.y) {
        setWin(true);
        setTimeout(() => router.push("/scrapbook"), 1700);
      }
    }
  }

  return (
    <main style={styles.bg}>
      <audio src="/lagu.mp3" autoPlay loop hidden />
      <h1 style={styles.title}><span role="img" aria-label="home">🏠</span> Maze to Home</h1>
      <p style={styles.text}>Gerakkan karakter ke rumah! (guna arrow key atau butang bawah)</p>
      <div style={styles.maze}>
        {initialMaze.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isBear = bear.x === rowIdx && bear.y === colIdx;
            const isHome = rowIdx === home.x && colIdx === home.y;
            return (
              <div
                key={rowIdx + "," + colIdx}
                style={{
                  ...styles.cell,
                  background: cell === 1 ? "#fbc2eb" : "#fff",
                  border: isHome ? "2.5px solid #fbc2eb" : "1px solid #f8a5c299",
                  position: "relative"
                }}
              >
                {isHome && (
                  <span style={{
                    fontSize: 24,
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: "translate(-50%,-50%)",
                    opacity: isBear && win ? 0 : 1,
                    transition: "opacity 0.5s"
                  }}>🏠</span>
                )}
                {isBear && (
                  <span style={{
                    fontSize: 28,
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: "translate(-50%,-50%) " + (anim ? "scale(1.15)" : ""),
                    transition: "transform 0.2s"
                  }}>🐻</span>
                )}
                {/* Animasi confetti bila win */}
                {isBear && isHome && win && (
                  <span style={{
                    position: "absolute",
                    left: "50%", top: "50%", transform: "translate(-50%,-50%)",
                    fontSize: 30, animation: "pop 1.2s"
                  }}>🎉</span>
                )}
              </div>
            );
          })
        )}
      </div>
      <div style={styles.controls}>
        <button onClick={() => move(-1,0)} style={styles.arrow}>↑</button>
        <div>
          <button onClick={() => move(0,-1)} style={styles.arrow}>←</button>
          <button onClick={() => move(0,1)} style={styles.arrow}>→</button>
        </div>
        <button onClick={() => move(1,0)} style={styles.arrow}>↓</button>
      </div>
      {win && <div style={styles.winText}>Tahniah! Sampai rumah! 🎉</div>}
      <style>
        {`
        @keyframes pop {
          0% { transform: scale(1) translate(-50%,-50%);}
          50% { transform: scale(1.7) translate(-50%,-50%);}
          100% { transform: scale(1) translate(-50%,-50%);}
        }
        `}
      </style>
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
  title: { fontSize: 32, color: "#b35b7a" },
  text: { color: "#b35b7a", fontSize: 18 },
  maze: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 34px)",
    gap: 3,
    margin: "30px 0",
    background: "#ffc8e6",
    padding: 14,
    borderRadius: 18
  },
  cell: {
    width: 34,
    height: 34,
    borderRadius: 7,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  controls: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8
  },
  arrow: {
    background: "#fbc2eb",
    border: "none",
    borderRadius: 8,
    fontSize: 22,
    padding: "8px 18px",
    margin: "2px 7px",
    color: "#b35b7a",
    cursor: "pointer",
    boxShadow: "0 2px 8px #f8a5c233"
  },
  winText: {
    marginTop: 16,
    color: "#27ae60",
    fontWeight: "bold",
    fontSize: 20
  }
};
