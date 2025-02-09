"use client";
import { useState } from "react";
import { Heart, DollarSign } from "lucide-react";
import TextPressure from "@/app/components/textPressure";
import LiveChat from "@/app/components/liveChat";
import { useParams } from "next/navigation";
import contractABI from "../contract_abi";


// Import ethers directly from the browser-compatible package
import { ethers } from "ethers";
import Integration from "@/app/integration/start";

export default function BattleRoyale() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasBetPlaced, setHasBetPlaced] = useState(false);
  const [selectedBot, setSelectedBot] = useState<string | number>("");
  const [txHash, setTxHash] = useState("");

  const params = useParams();
  const roomId = params.id; // The dynamic route parameter

  if (typeof roomId === "string") {
    const fight = "";
    console.log(fight);
  } else {
    console.error("Invalid roomId:", roomId);
  }

  const contractAddress = "0x97490eb90f2be6d6cbaf75951105ff1113779669";

  async function sendTransaction(botNumber: number) {
    try {
      const contractInterface = new ethers.utils.Interface(contractABI);
      const metaData = contractInterface.encodeFunctionData("placeBet", [
        botNumber,
      ]);

      const response = await fetch("/api/send-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metaData: metaData,
          to: contractAddress, // Replace with recipient address
          amount: ethers.utils.parseEther("0.00025").toString(), // Amount in ETH
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

  const getBetButtonText = (botNumber: number) => {
    if (isLoading) return "Placing Bet...";
    if (hasBetPlaced) {
      if (selectedBot === botNumber) return `Bet Placed on Bot ${botNumber}`;
      return `Bet Closed`;
    }
    return `Bet on Bot ${botNumber}`;
  };

  return (
    <div>
      <div className="bg-white-100 flex w-auto mt-10 mx-72 text-black">
        <div className="w-55">
          <div className="mt-4">
            <div style={{ position: "relative", height: "120px" }}>
              <TextPressure
                text="Battle_Royale!"
                flex={false}
                alpha={false}
                stroke={false}
                width={true}
                weight={false}
                italic={true}
                scale={false}
                textColor="#"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="flex-1">
              <Integration />

              <div className="max-w-5xl p-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          Content Creator 1
                        </h3>
                        <p className="text-sm text-gray-500">100k followers</p>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                          <Heart className="w-4 h-4" /> Follow
                        </button>

                        {error && <p className="text-red-500">{error}</p>}

                        <button
                          onClick={() => sendTransaction(1)}
                          disabled={isLoading || hasBetPlaced}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
                            ${
                              selectedBot === 1
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }
                            text-white 
                            ${
                              (isLoading || hasBetPlaced) && selectedBot !== 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                        >
                          <DollarSign className="w-4 h-4" />
                          {getBetButtonText(1)}
                        </button>

                        <button
                          onClick={() => sendTransaction(2)}
                          disabled={isLoading || hasBetPlaced}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
                            ${
                              selectedBot === 2
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }
                            text-white 
                            ${
                              (isLoading || hasBetPlaced) && selectedBot !== 2
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                        >
                          <DollarSign className="w-4 h-4" />
                          {getBetButtonText(2)}
                        </button>

                        {/* Add error display */}
                        {error && (
                          <div className="mt-2 text-red-500">{error}</div>
                        )}

                        {/* Add transaction hash display */}
                        {txHash && (
                          <div className="mt-2 text-green-500">
                            Transaction submitted: {txHash}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[400px] m-4 p-2">
                  <strong>About:</strong> Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Tempore perferendis omnis
                  expedita, labore debitis fugit dignissimos laborum esse quam
                  corporis porro, ipsa adipisci, alias totam dolorem saepe
                  itaque sapiente unde.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <LiveChat />
        </div>
      </div>
    </div>
  );
}
