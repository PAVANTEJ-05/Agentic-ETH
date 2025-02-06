"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function CreateWallet() {
  const { user, authenticated } = usePrivy();
  const [walletInfo, setWalletInfo] = useState<{ walletId: string; walletAddress: string } | null>(null);
  const [loading, setLoading] = useState(false);

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
        setWalletInfo({ walletId: data.walletId, walletAddress: data.walletAddress });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleCreateWallet}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating Wallet..." : "Create Wallet"}
      </button>

      {walletInfo && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md">
          <p className="font-bold">Wallet Created!</p>
          <p><strong>ID:</strong> {walletInfo.walletId}</p>
          <p><strong>Address:</strong> {walletInfo.walletAddress}</p>
          <button onClick={() => setWalletInfo(null)} className="mt-2 bg-red-500 text-white px-2 py-1 rounded">Close</button>
        </div>
      )}
    </div>
  );
}
