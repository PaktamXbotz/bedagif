"use client";
import { useState } from "react";

export default function PasswordPage() {
  const [input, setInput] = useState("");
  const [state, setState] = useState("idle"); // idle, error, success
  const PASSWORD = "shida";

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASSWORD) {
      setState("success");
      setTimeout(() => {
        window.location.href = "/puzzle";
      }, 1200);
    } else {
      setState("error");
      setTimeout(() => setState("idle"), 1200);
    }
  }

  return (
    <main style={styles.bg}>
      <h1 style={styles.title}>🔒 Birthday Gate</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={{
            ...styles.input,
            borderColor: state === "error" ? "#e57373" : "#bbb",
          }}
          type="password"
          placeholder="Enter the secret code"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setState("idle");
          }}
          autoFocus
        />
        <button style={styles.button} type="submit" disabled={state === "success"}>
          Unlock
        </button>
      </form>
      {state === "error" && (
        <>
          <img src="/wrong.gif" alt="error" width={80} style={{ margin: 8 }} />
          <p style={styles.error}>Salah password! 🐻 Cuba lagi~</p>
        </>
      )}
      {state === "success" && (
        <>
          <img src="/correct.gif" alt="success" width={80} style={{ margin: 8 }} />
          <p style={styles.success}>Yay! Berjaya 💖</p>
        </>
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
  title: {
    fontSize: 32,
    marginBottom: 24,
    color: "#b35b7a",
    letterSpacing: 2,
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
    background: "#f8a5c2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  error: {
    color: "#e57373",
    marginTop: 8,
    fontWeight: "bold",
  },
  success: {
    color: "#b35b7a",
    marginTop: 8,
    fontWeight: "bold",
  },
};
