"use client";
import React, { useState } from "react";

const pages = [
  { left: "/muka1.jpg", right: "Happy Last Teen Shidaaaa! 🥳" },
  { left: "/muka2.jpg", right: "Grateful to have you in my life 💖" },
  { left: "/muka3.jpg", right: "With you, every moment feels special 🌹" },
];

export default function Scrapbook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(null);

  function goNext() {
    setDirection("right");
    setTimeout(() => {
      setPage((p) => Math.min(p + 1, pages.length - 1));
      setDirection(null);
    }, 600);
  }

  function goPrev() {
    setDirection("left");
    setTimeout(() => {
      setPage((p) => Math.max(p - 1, 0));
      setDirection(null);
    }, 600);
  }

  return (
    <div style={styles.bg}>
      <h1 style={{ color: "#b35b7a", marginBottom: 22 }}>Memory...</h1>

      <div
        style={{
          ...styles.book,
          animation:
            direction === "right"
              ? "flipRight 0.6s forwards"
              : direction === "left"
              ? "flipLeft 0.6s forwards"
              : "none",
        }}
      >
        <div style={styles.leftPage}>
          <img
            src={pages[page].left}
            style={{ width: "100%", borderRadius: 16 }}
          />
        </div>
        <div style={styles.rightPage}>
          <p
            style={{
              fontSize: 24,
              color: "#b35b7a",
              margin: 40,
              textAlign: "center",
            }}
          >
            {pages[page].right}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button onClick={goPrev} disabled={page === 0} style={styles.pageBtn}>
          ⬅️
        </button>
        <span
          style={{
            margin: "0 16px",
            color: "#b35b7a",
            fontWeight: "bold",
          }}
        >
          {page + 1}/{pages.length}
        </span>
        <button
          onClick={goNext}
          disabled={page === pages.length - 1}
          style={styles.pageBtn}
        >
          ➡️
        </button>
      </div>

      {/* ✅ Button WA keluar bila dah habis page terakhir */}
      {page === pages.length - 1 && (
        <button
          onClick={() =>
            window.open("https://wa.me/60104498264?text=Kamuu%20Dah%20tknak%20chat%20saya%20ke%20Shidaaaa....", "_blank")
          }
          style={{
            marginTop: 28,
            background: "#25D366",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: 12,
            fontSize: 18,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px #0003",
          }}
        >
          💌 Byee
        </button>
      )}

      <style>
        {`
        @keyframes flipRight {
          0% { transform: rotateY(0deg); transform-origin: left; }
          50% { transform: rotateY(-90deg); transform-origin: left; }
          100% { transform: rotateY(0deg); transform-origin: left; }
        }

        @keyframes flipLeft {
          0% { transform: rotateY(0deg); transform-origin: right; }
          50% { transform: rotateY(90deg); transform-origin: right; }
          100% { transform: rotateY(0deg); transform-origin: right; }
        }
        `}
      </style>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fbc2eb 0%, #f9c6d0 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  book: {
    display: "flex",
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 2px 24px #0002",
    width: 420,
    minHeight: 280,
    overflow: "hidden",
    perspective: "1000px",
  },
  leftPage: {
    flex: 1,
    background: "#ffe0f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  rightPage: {
    flex: 1,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  pageBtn: {
    background: "#fbc2eb",
    color: "#b35b7a",
    padding: "10px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
  },
};
