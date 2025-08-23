"use client";
import React, { useState } from "react";

const pages = [
  { left: "/muka1.jpg", right: "Happy Last Teen Shidaaaa! 🥳" },
  { left: "/muka2.jpg", right: "Grateful to have you in my life 💖" },
  { left: "/muka3.jpg", right: "With you, every moment feels special 🌹" },
  // Tambah lagi page ikut suka!
];

export default function Scrapbook() {
  const [page, setPage] = useState(0);
  const [anim, setAnim] = useState(false);

  function goNext() {
    setAnim(true);
    setTimeout(() => {
      setPage(p => Math.min(p + 1, pages.length - 1));
      setAnim(false);
    }, 400);
  }
  function goPrev() {
    setAnim(true);
    setTimeout(() => {
      setPage(p => Math.max(p - 1, 0));
      setAnim(false);
    }, 400);
  }

  return (
    <div style={styles.bg}>
      <audio src="/cinnamon.mp3" autoPlay loop hidden />
      <h1 style={{color: "#b35b7a", marginBottom: 22}}>Memory...</h1>
      <div style={{
        ...styles.book,
        animation: anim ? "flip 0.4s" : "none"
      }}>
        <div style={styles.leftPage}>
          <img src={pages[page].left} style={{width: "100%", borderRadius: 16}} />
        </div>
        <div style={styles.rightPage}>
          <p style={{fontSize: 24, color:"#b35b7a", margin: 40}}>{pages[page].right}</p>
        </div>
      </div>
      <div style={{marginTop: 18}}>
        <button onClick={goPrev} disabled={page === 0} style={styles.pageBtn}>⬅️</button>
        <span style={{margin: "0 16px", color: "#b35b7a", fontWeight: "bold"}}>{page + 1}/{pages.length}</span>
        <button onClick={goNext} disabled={page === pages.length - 1} style={styles.pageBtn}>➡️</button>
      </div>
      <style>
        {`
        @keyframes flip {
          0% { transform: rotateY(0deg);}
          50% { transform: rotateY(60deg);}
          100% { transform: rotateY(0deg);}
        }
        `}
      </style>
    </div>
  );
}

const styles = {
  bg: { minHeight: "100vh", background: "#fbc2eb", display: "flex", flexDirection: "column", alignItems:"center", justifyContent:"center" },
  book: { display: "flex", background: "#fff", borderRadius: 24, boxShadow: "0 2px 24px #0002", width: 420, minHeight: 280, overflow: "hidden" },
  leftPage: { flex: 1, background: "#ffe0f7", display: "flex", alignItems: "center", justifyContent: "center", padding: 14 },
  rightPage: { flex: 1, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 14 },
  pageBtn: {
    background: "#fbc2eb",
    color: "#b35b7a",
    padding: "10px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer"
  }
};
