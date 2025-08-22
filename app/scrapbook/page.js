"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const scrapbook = [
  {
    img: "/scrap1.jpg",
    text: "Terima kasih sebab sentiasa ada 🌸",
  },
  {
    img: "/scrap2.jpg",
    text: "Happy Birthday! Semoga hari-hari kau penuh bahagia 💖",
  },
  {
    img: "/scrap3.jpg",
    text: "Doa yang baik-baik untuk kau, always! 🫶",
  },
];

export default function ScrapbookPage() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const router = useRouter();

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>💌 Scrapbook</h1>
      <p style={styles.text}>Surat & kenangan untuk kau!</p>
      {!open ? (
        <div style={styles.envWrap}>
          <div style={styles.envelopeTop}></div>
          <div style={styles.envelopeBottom}></div>
          <button style={styles.openBtn} onClick={() => setOpen(true)}>
            Open Envelope ✉️
          </button>
        </div>
      ) : (
        <div style={styles.scrapBox}>
          <img
            src={scrapbook[idx].img}
            alt="scrap"
            width={180}
            style={{ borderRadius: 16, boxShadow: "0 2px 12px #f8a5c277" }}
          />
          <p style={styles.scrapText}>{scrapbook[idx].text}</p>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <button
              style={styles.navBtn}
              disabled={idx === 0}
              onClick={() => setIdx(idx - 1)}
            >
              ◀️
            </button>
            <button
              style={styles.navBtn}
              disabled={idx === scrapbook.length - 1}
              onClick={() => setIdx(idx + 1)}
            >
              ▶️
            </button>
          </div>
          <p style={{ marginTop: 24 }}>
            <button style={styles.homeBtn} onClick={() => router.push("/")}>
              Kembali ke Halaman Utama 🎀
            </button>
          </p>
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
    justifyContent: "center",
  },
  title: { fontSize: 32, marginBottom: 14, color: "#b35b7a" },
  text: { color: "#b35b7a", marginBottom: 16, fontSize: 18 },
  envWrap: {
    position: "relative",
    width: 200,
    height: 150,
    marginTop: 18,
    marginBottom: 18,
  },
  envelopeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 80,
    background: "linear-gradient(135deg, #f8a5c2 80%, #fff0f7 100%)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: "skewY(-10deg)",
    zIndex: 2,
  },
  envelopeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 200,
    height: 95,
    background: "#fff0f7",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    zIndex: 1,
    boxShadow: "0 4px 16px #f8a5c288"
  },
  openBtn: {
    position: "absolute",
    left: "50%",
    bottom: 10,
    transform: "translateX(-50%)",
    background: "#f8a5c2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    zIndex: 3,
    boxShadow: "0 2px 10px #f8a5c277"
  },
  scrapBox: {
    background: "#fff0f7",
    borderRadius: 18,
    boxShadow: "0 4px 16px #f8a5c288",
    padding: "28px 22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 220
  },
  scrapText: {
    color: "#b35b7a",
    fontSize: 16,
    textAlign: "center",
    margin: "14px 0 6px 0"
  },
  navBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: 8,
    background: "#f8a5c2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.2s"
  },
  homeBtn: {
    background: "#f8a5c2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    marginTop: 8
  }
};
