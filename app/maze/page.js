"use client";
import { useRouter } from "next/navigation";

export default function MazePage() {
  const router = useRouter();

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🌀 The Birthday Maze</h1>
      <p style={styles.text}>
        You found your way here! <br /> Tapi... jalan keluar hanya satu.<br />
        <span style={{ fontWeight: "bold" }}>Hint:</span> Click the right button!
      </p>
      <div style={styles.choices}>
        <button style={styles.button} onClick={() => router.push("/puzzle")}>Left</button>
        <button style={styles.button} onClick={() => alert("Oops, jalan buntu!")}>Center</button>
        <button style={styles.button} onClick={() => alert("Eh, salah lorong!")}>Right</button>
      </div>
      <p style={styles.small}>
        <a href="/password" style={styles.link}>Back to Gate</a>
      </p>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a084e8 0%, #f8fafc 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: "#fff",
    letterSpacing: 2,
    textShadow: "2px 2px 8px #a084e8",
  },
  text: {
    color: "#333",
    fontSize: 20,
    marginBottom: 26,
    textAlign: "center",
  },
  choices: {
    display: "flex",
    gap: 18,
    marginBottom: 20,
  },
  button: {
    padding: "10px 24px",
    fontSize: 20,
    borderRadius: 10,
    background: "#fff",
    color: "#a084e8",
    border: "2px solid #a084e8",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  },
  small: {
    fontSize: 14,
    marginTop: 30,
    color: "#fff",
  },
  link: {
    color: "#fff",
    textDecoration: "underline",
  },
};
