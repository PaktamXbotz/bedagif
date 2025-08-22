"use client";
import React, { useState } from "react";

const PIN_LENGTH = 6; // Boleh tukar ke 4, 5, 6 ikut suka

export default function PasswordPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNum = (num) => {
    if (pin.length < PIN_LENGTH) {
      setPin(pin + num);
      setError("");
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === PIN_LENGTH) {
      // Contoh: Validasi PIN, tukar ikut keperluan
      if (pin === "123456") {
        setSuccess(true);
        setError("");
        setPin("");
      } else {
        setError("PIN salah, cuba lagi!");
        setPin("");
      }
    } else {
      setError("Sila masukkan PIN penuh!");
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.lockIcon}>🔒</div>
      <h2 style={{color:"#b35b7a"}}>Masukkan PIN</h2>
      <div style={styles.pinRow}>
        {[...Array(PIN_LENGTH)].map((_, i) => (
          <span key={i} style={styles.pinDot}>
            {pin[i] ? "●" : "○"}
          </span>
        ))}
      </div>
      <div style={styles.keypad}>
        {[1,2,3,4,5,6,7,8,9,0].map((num, i) => (
          <button
            key={i}
            style={styles.keyBtn}
            onClick={() => handleNum(num.toString())}
            disabled={pin.length === PIN_LENGTH}
          >
            {num}
          </button>
        ))}
        <button style={styles.keyBtn} onClick={handleDelete} disabled={!pin.length}>⌫</button>
        <button style={styles.keyBtnMain} onClick={handleSubmit}>OK</button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>PIN betul! Selamat datang 🎉</div>}
    </div>
  );
}

const styles = {
  wrap: {
    width: 300,
    margin: "40px auto",
    padding: 24,
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 8px 32px #0001",
    textAlign: "center"
  },
  lockIcon: {
    fontSize: 40,
    marginBottom: 12
  },
  pinRow: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12
  },
  pinDot: {
    fontSize: 32,
    color: "#b35b7a"
  },
  keypad: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 14
  },
  keyBtn: {
    fontSize: 22,
    padding: "16px 0",
    borderRadius: 8,
    border: "1px solid #f8a5c2",
    background: "#fbc2eb",
    color: "#b35b7a",
    fontWeight: "bold",
    cursor: "pointer"
  },
  keyBtnMain: {
    gridColumn: "1 / span 3",
    fontSize: 22,
    padding: "16px 0",
    borderRadius: 8,
    border: "1px solid #f8a5c2",
    background: "#b35b7a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8
  },
  error: {
    marginTop: 10,
    color: "#e74c3c",
    fontWeight: "bold"
  },
  success: {
    marginTop: 14,
    color: "#5cb85c",
    fontWeight: "bold"
  }
};
