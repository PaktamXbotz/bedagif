"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = "tes123"; // tukar ikut suka kau 🎂

    if (input === correctPassword) {
      router.push("/puzzle"); // pergi ke page puzzle
    } else {
      setError("Wrong password! Try again 😅");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Enter the Secret Password 🎁</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Type password..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 mb-3 border rounded-lg focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
          >
            Unlock 🔓
          </button>
        </form>
      </div>
    </div>
  );
}
