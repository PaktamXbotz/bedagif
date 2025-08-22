"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PuzzlePage() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  // Tukar soalan & jawapan ikut citarasa
  const puzzle = "Aku sentiasa di depan kau waktu pagi, tapi hilang waktu malam. Siapa aku?";
  const correct = "matahari";

  function handleSubmit(e) {
    e.preventDefault();
    if (answer.trim().toLowerCase() === correct) {
      router.push("/cake");
    } else {
      setError(true);
    }
  }

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🧩 Puzzle Time!</h1>
      <p style={styles.puzzle}>{puzzle}</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Jawapan..."
          value={answer}
          onChange={e => {
            setAnswer(e.target.value);
            setError(false);
          }}
          style={{ ...styles.input, borderColor: error ? "#e74c3c" : "#bbb" }}
        />
        <button style={styles.button} type="submit">
          Jawab
        </button>
      </form>
      {error && <p style={styles.error}>Salah! Cuba lagi...</p>}
      <p style={styles.small}><a href="/maze" style={styles.link}>← Balik Maze</a></p>
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #a084e8 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    letterSpacing: 2,
    color: "#a084e8",
  },
  puzzle: {
    fontSize: 20,
    marginBottom: 18,
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    border: "2px solid #bbb",
    outline: "none",
    minWidth: 180,
    transition: "border 0.2s",
  },
  button: {
    padding: "10px 18px",
    fontSize: 18,
    borderRadius: 8,
    border: "none",
    background: "#a084e8",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  error: {
    color: "#e74c3c",
    marginTop: 8,
    fontWeight: "bold",
  },
  small: {
    fontSize: 14,
    marginTop: 30,
    color: "#888",
  },
  link: {
    color: "#a084e8",
    textDecoration: "underline",
  },
};
