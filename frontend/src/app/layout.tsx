import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/auth/providers";
import Leaderboard from "./components/leaderboard";
import Nav from "@/app/ui/navbar"
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      ><Nav/>
        <Providers>{children}</Providers>
        <Leaderboard />
        <footer className="bg-white">
          <h1 className="flex justify-center items-center text-black">
            Copyright © 2025 Kalesh. All Rights Reserved.
          </h1>
        </footer>
      </body>
    </html>
  );
}
