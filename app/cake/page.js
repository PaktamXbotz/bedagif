"use client";
import { useRouter } from "next/navigation";

export default function CakePage() {
  const router = useRouter();
  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🎂 Happy Birthday!</h1>
      <div style={styles.cake}>
        <div style={styles.cakeBase}></div>
        <div style={styles.candle}></div>
      </div>
      <p style={styles.text}>
        Semoga panjang umur, murah rezeki, dan bahagia selalu!<br />
        Tekan butang bawah untuk ucapan akhir 🎉
      </p>
      <button style={styles.button} onClick={() => router.push("/")}>
        Go to Home
      </button>
      <p style={styles.small}><a href="/puzzle" style={styles.link}>← Back to Puzzle</a></p>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fffbe7 0%, #ffe5ec 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 18,
    fontWeight: "bold",
    color: "#ff6f91",
    letterSpacing: 2,
  },
  cake: {
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: 24,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  cakeBase: {
    width: 90,
    height: 45,
    background: "#ffb677",
    borderRadius: "0 0 40px 40px",
    boxShadow: "0 4px 12px #ffa50255",
    position: "absolute",
    bottom: 0,
  },
  candle: {
    width: 10,
    height: 40,
    background: "#fff",
    borderRadius: 5,
    position: "absolute",
    bottom: 45,
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: "0 0 8px #ff6f91",
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    color: "#ff6f91",
    textAlign: "center",
  },
  button: {
    background: "#ff6f91",
    color: "#fff",
    border: "none",
    padding: "12px 26px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 18,
    cursor: "pointer",
    marginBottom: 18,
    transition: "background 0.2s",
  },
  small: {
    fontSize: 14,
    marginTop: 12,
    color: "#aaa",
  },
  link: {
    color: "#ff6f91",
    textDecoration: "underline",
  },
};
