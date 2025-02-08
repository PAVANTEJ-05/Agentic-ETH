"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";
import CenteredWalletModal from "./privy_wallet";

export default function CreateWallet() {
  const { user, authenticated } = usePrivy();
  const [walletInfo, setWalletInfo] = useState<{
    walletId: string;
    walletAddress: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [close, setClose] = useState(true);

  async function handleCreateWallet() {
    if (!authenticated || !user?.id) {
      alert("Please log in first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }), // Send userId to server
      });

      const data = await response.json();
      if (response.ok) {
        setWalletInfo({
          walletId: data.walletId,
          walletAddress: data.walletAddress,
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }

    setLoading(false);
    setClose(false);
  }

  const handleFundWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature");
        return;
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const amountInWei = ethers.utils
        .parseEther(amount.toString())
        .toHexString();
      const money = amountInWei.slice(2);

      // Prepare transaction parameters
      if (walletInfo) {
        const transactionParameters = {
          to: walletInfo.walletAddress || "s", // Recipient address
          from: window.ethereum.selectedAddress, // Current user's address
          value: `0x${money}`, // Amount in hex (user will input in MetaMask)
        };

        // Send transaction request to MetaMask
        await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
      }

      setAmount("");
      alert("Transaction initiated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  const handleCloseWallet = () => {
    setClose(true);
  }

  return (
    <div>
      <button
        onClick={handleCreateWallet}
        className="bg-blue-500 text-white py-2 px-4 rounded-xl"
        disabled={loading}
      >
        {loading ? "Creating Wallet..." : "Create Wallet"}
      </button>

      {walletInfo && !close && (
        <CenteredWalletModal
          handleFundWallet={handleFundWallet}
          amount={amount}
          setAmount={setAmount}
          walletInfo={walletInfo}
          onClose={handleCloseWallet}
        />
      )}
    </div>
  );
}