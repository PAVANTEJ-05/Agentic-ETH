"use client";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./components/carousel";
import Live from "./components/live";
import Category from "./components/category";
import Auth from "@/auth/auth";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import Individual from "./components/individual";
import More from "./components/more";
import CreateWallet from "./components/create-wallet";
import TransactionForm from "./components/transactionFor";
import { CircleUserRound, Divide } from "lucide-react";
import Navbar from "./components/common-components/navbar";

export default function Home() {
  const { login, logout, user, ready } = usePrivy();
  const [addr, setAddr] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [display, setDisplay] = useState(false);

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

  async function sendTransaction() {
    try {
      const response = await fetch("/api/send-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "0x34040646ba5166C6Df72Eb82d754AcF9EaCe5724", // Replace with recipient address
          amount: "0.00025", // Amount in ETH
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
      <Navbar user={user} setDisplay={setDisplay} logout={logout} display={display}/>
      <div className="pl-80 pt-16 pr-4">
        <div className="relative z-0">
          <ImageSlider />
        </div>
        <Live />
        <More />
        <Category />
        <hr className="border-black" />
        <Individual label="Gaming" />
        <More />
        <Individual label="Sports" />
        <More />
        <Individual label="Politics" />
        <More />
        <Individual label="Movies" />
        <More />
        <Individual label="Casual" />
        <More />
      </div>
    </div>
  );
}
