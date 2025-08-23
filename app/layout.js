import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "./music"; // import component client

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Birthday Gift 🎂",
  description: "Special birthday surprise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Music player akan jalan kat semua page */}
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
