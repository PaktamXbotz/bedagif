"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Maze size and layout (1: wall, 0: path, 2: end)
const MAZE = [
  [1,1,1,1,1,1,1],
  [1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1],
  [1,0,1,1,1,0,1],
  [1,0,0,0,1,2,1],
  [1,1,1,1,1,1,1]
];
const START = [1,1];

function findEnd(maze) {
  for (let i=0; i<maze.length; i++) for (let j=0; j<maze[0].length; j++)
    if (maze[i][j] === 2) return [i,j];
}

export default function MazePage() {
  const router = useRouter();
  const [pos, setPos] = useState(START);
  const [solved, setSolved] = useState(false);
  const end = findEnd(MAZE);

  // Keyboard control
  useEffect(() => {
    function handle(e) {
      if (solved) return;
      if (e.key === "ArrowUp") move(-1,0);
      if (e.key === "ArrowDown") move(1,0);
      if (e.key === "ArrowLeft") move(0,-1);
      if (e.key === "ArrowRight") move(0,1);
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [pos, solved]);

  function move(dx,dy) {
    if (solved) return;
    let [x,y] = pos;
    let nx = x+dx, ny = y+dy;
    if (MAZE[nx][ny] === 1) return;
    setPos([nx,ny]);
    if (MAZE[nx][ny] === 2) setSolved(true);
  }

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🏠 Maze to Home</h1>
      <p style={styles.text}>Gerakkan karakter ke rumah! (guna arrow key atau butang bawah)</p>
      <div style={styles.maze}>
        {MAZE.map((row, r) =>
          row.map((cell, c) => (
            <div key={r+"-"+c} style={{
              ...styles.cell,
              background:
                cell === 1 ? "#ecb2d5" :
                cell === 2 ? "#ffe066" : "#fff"
            }}>
              {pos[0] === r && pos[1] === c && (
                <span style={{fontSize:32}}>🐻</span>
              )}
              {cell === 2 && pos[0] !== r && pos[1] !== c && (
                <span style={{fontSize:24}}>🏡</span>
              )}
            </div>
          ))
        )}
      </div>
      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={()=>move(-1,0)}>⬆️</button>
        <div>
          <button style={styles.btn} onClick={()=>move(0,-1)}>⬅️</button>
          <button style={styles.btn} onClick={()=>move(0,1)}>➡️</button>
        </div>
        <button style={styles.btn} onClick={()=>move(1,0)}>⬇️</button>
      </div>
      {solved && (
        <div style={styles.winBox}>
          <img src="/cakecute.gif" width={80} />
          <p style={styles.success}>Sampai rumah! Jom tengok scrapbook 🎀</p>
          <button style={styles.button} onClick={() => router.push("/scrapbook")}>Next: Scrapbook</button>
        </div>
      )}
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fbc2eb 0%, #f9c6d0 100%)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
  },
  title: { fontSize: 32, marginBottom: 10, color: "#b35b7a" },
  text: { color: "#b35b7a", marginBottom: 12, fontSize: 18, textAlign: "center" },
  maze: {
    display: "grid",
    gridTemplateColumns: "repeat(7,40px)",
    gridTemplateRows: "repeat(7,40px)",
    gap: 2,
    background: "#f8a5c2",
    borderRadius: 10,
    margin: "20px 0"
  },
  cell: {
    width: 40, height: 40,
    borderRadius: 6,
    border: "1px solid #f8a5c2",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18,
    boxSizing: "border-box"
  },
  btnRow: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8
  },
  btn: {
    background: "#f8a5c2",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 22,
    margin: 4,
    cursor: "pointer"
  },
  winBox: { marginTop: 18, textAlign: "center" },
  success: { color: "#b35b7a", fontWeight: "bold", marginTop: 8 },
  button: {
    background: "#f8a5c2",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    cursor: "pointer"
  }
};
