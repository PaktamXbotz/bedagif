"use client";
import { useState } from "react";

export default function PasswordPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  // Tukar password ikut suka
  const PASSWORD = "happybday";

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
      window.location.href = "/maze";
    } else {
      setError(true);
    }
  }

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🔒 Birthday Gate</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={{ ...styles.input, borderColor: error ? "#e74c3c" : "#bbb" }}
          type="password"
          placeholder="Enter the secret code"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
        />
        <button style={styles.button} type="submit">
          Unlock
        </button>
      </form>
      {error && <p style={styles.error}>Wrong password! Try again...</p>}
    </main>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e0c3fc 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    letterSpacing: 2,
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
};
