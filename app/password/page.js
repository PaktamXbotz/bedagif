"use client";
import React, { useState, useRef } from "react";

const PADLOCK_SVG = (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    style={{ display: "block", margin: "0 auto" }}
  >
    <rect x="14" y="28" width="36" height="28" rx="6" fill="#FFD700" />
    <rect x="22" y="40" width="20" height="10" rx="4" fill="#B8860B" />
    <path
      d="M20 28V20C20 12.268 26.268 6 34 6C41.732 6 48 12.268 48 20V28"
      stroke="#333"
      strokeWidth="4"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="32" cy="48" r="3" fill="#333" />
  </svg>
);

const CORRECT_PASSWORD = "2580"; // Tukar sini untuk password lain

export default function PasswordPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    let val = e.target.value.replace(/\D/g, ""); // Only digits
    if (val.length > 4) val = val.slice(0, 4);
    setInput(val);
  };

  const handleUnlock = () => {
    if (input === CORRECT_PASSWORD) {
      setUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setInput("");
      inputRef.current && inputRef.current.focus();
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.length === 4) {
      handleUnlock();
    }
  };

  return (
    <div className="pw-container">
      <div className={`padlock${shake ? " shake" : ""}${unlocked ? " unlocked" : ""}`}>
        {PADLOCK_SVG}
      </div>
      <div style={{ margin: "20px 0" }}>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          ref={inputRef}
          maxLength={4}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={unlocked}
          className="pw-input"
          placeholder="••••"
        />
      </div>
      <button
        disabled={input.length !== 4 || unlocked}
        onClick={handleUnlock}
        className="unlock-btn"
      >
        Unlock
      </button>
      <style jsx>{`
        .pw-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 90vh;
          justify-content: center;
          background: #faf8ef;
        }
        .padlock {
          transition: transform 0.2s;
          will-change: transform;
        }
        .padlock.shake {
          animation: shake 0.6s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(10px); }
          45% { transform: translateX(-10px); }
          60% { transform: translateX(10px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .padlock.unlocked {
          filter: drop-shadow(0 0 12px #ffd700);
          opacity: 0.7;
        }
        .pw-input {
          font-size: 2.2rem;
          letter-spacing: 0.7em;
          text-align: center;
          width: 10em;
          border: 2px solid #ffc107;
          border-radius: 1.5em;
          padding: 0.5em 0.7em;
          outline: none;
          background: #fffde7;
          color: #111;
          box-shadow: 0 2px 8px #ffe08255;
          margin-bottom: 10px;
        }
        .pw-input:disabled {
          background: #eee;
        }
        .unlock-btn {
          font-size: 1.1rem;
          padding: 0.6em 2em;
          border: none;
          border-radius: 1em;
          background: #ffd700;
          color: #333;
          font-weight: bold;
          box-shadow: 0 2px 6px #b8860b44;
          cursor: pointer;
          transition: background 0.2s;
        }
        .unlock-btn:disabled {
          background: #ffe082;
          color: #aaa;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .pw-input { width: 7.2em; font-size: 1.8rem; }
          .padlock svg { width: 44px; height: 44px; }
        }
      `}</style>
      {unlocked && (
        <div style={{ marginTop: 20, color: "#388e3c", fontWeight: "bold" }}>
          Unlocked!
        </div>
      )}
    </div>
  );
}
