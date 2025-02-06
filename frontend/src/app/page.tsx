"use client";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./components/carousel";
import Live from "./components/live";
import Category from "./components/category";
import Auth from "@/auth/auth";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { log } from "console";

import Individual from "./components/individual";
import More from "./components/more";
import CreateWallet from "./components/create-wallet";

export default function Home() {
  const { login, logout, user, ready } = usePrivy();
  const [addr, setAddr] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);

  async function createPrivyWallet() {
    const response = await fetch("/api/create-wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log("Wallet Address:", data.walletAddress);
    } else {
      console.error("Error:", data.error);
    }
  }

  async function sendTransaction(){
    try {
      const response = await fetch("/api/send-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          
          to: "0x34040646ba5166C6Df72Eb82d754AcF9EaCe5724", // Replace with recipient address
          amount: "0.0005", // Amount in ETH
        }),
      });

      const data = await response.json();
      console.log("trnx successful ", data.txHash);
      if (response.ok) {
        setTxHash(data.txHash);
      } else {
        console.log(data.error);
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-3 bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex items-center max-w-8xl mx-auto w-full px-4">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 mr-auto"
          >
            <Image src="/assets/bg.png" alt="logo" width={60} height={40} />
            <h1 className="text-3xl font-bold text-gray-800">Kalesh</h1>
          </Link>
          <div className="mx-4 w-1/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="ml-auto">
            {!user? (<div className="px-1 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              <Auth />
            </div>): (
              <div className="flex flex-row px-1 align-middle ">
              <button className="bg-slate-500 px-4 py-2">Connected as: {user.wallet?.address.slice(0, 4)+ "..."+ user.wallet?.address.slice(38, 42) }</button>
              <button className="px-4 py-2 bg-green-500">Upgrade</button>
              <button onClick={logout} className="px-4 py-2 bg-red-500 text-white">
                Logout
              </button>
              </div>
            )}
          <button className="px-4 py-2 bg-cyan-700" onClick={createPrivyWallet}>Server wallet</button>
          {addr? (<p>connected</p>): (<p>failed tp </p>)}
          <button className="px-4 py-2 bg-cyan-700" onClick={sendTransaction}>Send trnx</button>
          </div>
        </div>
        <CreateWallet/>
      </header>
      <div>
        <ImageSlider />
        <Live />
        <More />
        <Category />
        <hr className="border-black" />
        <Individual label="Gaming" />
        <hr className="border-black" />
        <Individual label="Sports" />
        <hr className="border-black" />
        <Individual label="Politics" />
        <hr className="border-black" />
        <Individual label="Movies" />
        <hr className="border-black" />
        <Individual label="Casual" />
        <hr className="border-black pb-4" />
      </div>
      
      
    </div>
  );
}
