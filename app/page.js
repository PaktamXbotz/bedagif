"use client";
import { useRef } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const audioRef = useRef(null);

  // Confetti masa page load (optional)
  // useEffect(() => { confetti(); }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div style={styles.bg}>
      <audio
        ref={audioRef}
        src="/cinnamon.mp3"
        preload="auto"
        hidden
      />
      <h1 style={styles.title}>🎀 Happy Birthday Kamuu! 🎂</h1>
      <p style={styles.text}>Semoga panjang umur, murah rezeki & may all your dreams come true💕</p>
      <img src="/cakecute.gif" alt="Birthday Cake" width="200" />
      <br />
      <a href="/password" onClick={handlePlayAudio}>
        <button style={styles.button}>Tekanlahh,kalau nak main gamee 🙄🌷</button>
      </a>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9c6d0 0%, #fbc2eb 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textShadow: "2px 2px 8px #f8a5c2",
  },
  text: {
    color: "#b35b7a",
    fontSize: 20,
    marginBottom: 18,
  },
  button: {
    padding: "14px 28px",
    fontSize: 18,
    borderRadius: 10,
    background: "#f8a5c2",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    marginTop: 32,
    cursor: "pointer",
    boxShadow: "0 2px 10px #f8a5c299",
    transition: "background 0.2s",
  },
};
