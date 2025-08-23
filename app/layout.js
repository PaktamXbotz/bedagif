import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "./music";

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
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
