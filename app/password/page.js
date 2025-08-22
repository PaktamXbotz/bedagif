"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PIN_LENGTH = 6;
const CORRECT_PIN = "181106";

export default function PasswordPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [openLock, setOpenLock] = useState(false);
  const router = useRouter();

  const handleNum = (num) => {
    if (pin.length < PIN_LENGTH && !success) {
      setPin(pin + num);
      setError("");
    }
  };

  const handleDelete = () => {
    if (!success) setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === PIN_LENGTH) {
      if (pin === CORRECT_PIN) {
        setSuccess(true);
        setError("");
        setOpenLock(true);
        setTimeout(() => {
          router.push("/puzzle");
        }, 1100);
      } else {
        setError("PIN salah, cuba lagi!");
        setShake(true);
        setPin("");
        setTimeout(() => setShake(false), 500);
      }
    } else {
      setError("Sila masukkan PIN penuh!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.center}>
        <div
          style={{
            ...styles.lockIcon,
            transition: "transform 0.5s cubic-bezier(.36,.07,.19,.97)",
            transform: openLock ? "rotate(-20deg) translateY(-20px)" : "none"
          }}
        >
          {/* SVG padlock */}
          {!openLock ? (
            <svg width="44" height="44" viewBox="0 0 44 44">
              <rect x="12" y="20" width="20" height="18" rx="5" fill="#222"/>
              <rect x="16" y="9" width="12" height="16" rx="6" fill="#FFD966" stroke="#222" strokeWidth="2"/>
              <rect x="18" y="16" width="8" height="8" rx="4" fill="#FFD966"/>
            </svg>
          ) : (
            <svg width="44" height="44" viewBox="0 0 44 44">
              <rect x="12" y="20" width="20" height="18" rx="5" fill="#222"/>
              <rect x="16" y="9" width="12" height="10" rx="6" fill="#FFD966" stroke="#222" strokeWidth="2" transform="rotate(-25 22 14)"/>
              <rect x="18" y="16" width="8" height="8" rx="4" fill="#FFD966"/>
            </svg>
          )}
        </div>
        <h2 style={{color:"#b35b7a", margin: "16px 0 12px 0"}}>Masukkan PIN</h2>
        <div style={styles.pinRow}>
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <span key={i} style={styles.pinDot}>
              {pin[i] ? "●" : "○"}
            </span>
          ))}
        </div>
        <div
          style={{
            ...styles.keypad,
            animation: shake ? "shake 0.35s" : "none"
          }}
        >
          {[1,2,3,4,5,6,7,8,9,0].map((num, i) => (
            <button
              key={i}
              style={styles.keyBtn}
              onClick={() => handleNum(num.toString())}
              disabled={pin.length === PIN_LENGTH || success}
            >
              {num}
            </button>
          ))}
          <button
            style={styles.keyBtn}
            onClick={handleDelete}
            disabled={!pin.length || success}
          >
            ⌫
          </button>
          <button
            style={styles.keyBtnMain}
            onClick={handleSubmit}
            disabled={success}
          >
            OK
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {success && (
          <div style={styles.success}>
            PIN betul! Selamat datang <span role="img" aria-label="party">🎉</span>
          </div>
        )}
      </div>
      {/* Keyframe animasi shake */}
      <style>
        {`
          @keyframes shake {
            10%, 90% { transform: translateX(-2px);}
            20%, 80% { transform: translateX(4px);}
            30%, 50%, 70% { transform: translateX(-7px);}
            40%, 60% { transform: translateX(7px);}
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fbc2eb 0%, #f9c6d0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    padding: 32,
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 12px 32px #0002",
    width: 350,
    maxWidth: "96vw",
    textAlign: "center"
  },
  lockIcon: {
    margin: "0 auto",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    gap: 14,
    marginBottom: 18,
    marginTop: 12,
    minWidth: 220
  },
  keyBtn: {
    fontSize: 22,
    padding: "16px 0",
    borderRadius: 10,
    border: "none",
    background: "#fbc2eb",
    color: "#b35b7a",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 10px #f9c6d0aa"
  },
  keyBtnMain: {
    gridColumn: "1 / span 3",
    fontSize: 22,
    padding: "16px 0",
    borderRadius: 10,
    border: "none",
    background: "#b35b7a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8,
    boxShadow: "0 2px 10px #f9c6d0aa"
  },
  error: {
    marginTop: 10,
    color: "#e74c3c",
    fontWeight: "bold"
  },
  success: {
    marginTop: 14,
    color: "#27ae60",
    fontWeight: "bold"
  }
};
