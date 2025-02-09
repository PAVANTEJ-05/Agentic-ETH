'use client'
import { useState, useEffect } from 'react';
import { Heart, DollarSign } from 'lucide-react';
import TextPressure from "@/app/components/textPressure";
import LiveChat from "@/app/components/liveChat";

export default function BattleRoyale() {
  const {ethers} = require('ethers');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [hasBetPlaced, setHasBetPlaced] = useState(false);
  const [selectedBot, setSelectedBot] = useState<string | number>("");

const contractAddress = '0x97490eb90f2be6d6cbaf75951105ff1113779669'
const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "personality",
				"type": "uint8"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "deployed_address",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "FightCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "winner",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalPool",
				"type": "uint256"
			}
		],
		"name": "FightFinalized",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "winningPersonality",
				"type": "uint8"
			}
		],
		"name": "finalizeFight",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "personality",
				"type": "uint8"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "UserPaid",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdrawPlatformFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentFight",
		"outputs": [
			{
				"internalType": "address",
				"name": "roomCreator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isFinalized",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "winner",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalPool",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "betAmountBot1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "betAmountBot2",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_BET_AMOUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PLATFORM_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformFeesAccumulated",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const placeBet = async (botNumber: string | number) => {
  setIsLoading(true);
  setError('');

  try {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask to place bets');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const MIN_BET_AMOUNT = ethers.utils.parseEther("0.001");
    
    const tx = await contract.placeBet(botNumber, {
      value: MIN_BET_AMOUNT,
      gasLimit: 200000 
    });

    const receipt = await tx.wait();


    setIsLoading(true)
      
    if (receipt.status === 1) {
      setHasBetPlaced(true);
      setSelectedBot(botNumber);
      alert(`Bet placed successfully on Bot ${botNumber}!`);
    } else {
      throw new Error('Transaction failed');
    }

    setHasBetPlaced(true);
    setSelectedBot(botNumber);
    
    alert(`Bet placed successfully on Bot ${botNumber}!`);
  } catch (err) {
    console.error('Error placing bet:', err);
    if (err) {
      console.error('Transaction was rejected in MetaMask');
    } else if (err) {
      console.error('Insufficient funds to place bet');
    } else {
      console.error('Failed to place bet. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
};

const getBetButtonText = (botNumber: string | number) => {
  if (isLoading) return 'Placing Bet...';
  if (hasBetPlaced) {
    if (selectedBot === botNumber) return `Bet Placed on Bot ${botNumber}`;
    return `Bet Closed`;
  }
  return `Bet on Bot ${botNumber}`;
};


 

    return (<div >
<div className="bg-white-100 flex w-auto mt-10 mx-72 text-black" >

      <div className="w-55 ">
      <div className="mt-4">
        <div style={{ position: 'relative', height: '120px' }}>
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
          <iframe
            className="w-full aspect-video rounded-lg shadow"
            src="https://www.youtube.com/embed/V_34qKgCNT4?si=JwSj0ByLgUuOL08e"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          
          <div className="max-w-5xl p-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
                  {/* <Image src={img} alt="Creator Avatar" className="w-full h-full object-cover" /> */}
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Content Creator 1</h3>
                    <p className="text-sm text-gray-500">100k followers</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      <Heart className="w-4 h-4" /> Follow
                    </button>
                    
                    <button 
                      onClick={() => placeBet(1)} 
                      disabled={isLoading || hasBetPlaced}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
                        ${selectedBot === 1 ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                        text-white 
                        ${(isLoading || hasBetPlaced) && selectedBot !== 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <DollarSign className="w-4 h-4" />
                      {getBetButtonText(1)}
                    </button>
                    
                    <button 
                      onClick={() => placeBet(2)}
                      disabled={isLoading || hasBetPlaced}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
                        ${selectedBot === 2 ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                        text-white 
                        ${(isLoading || hasBetPlaced) && selectedBot !== 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <DollarSign className="w-4 h-4" />
                      {getBetButtonText(2)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="h-[400px] m-4 p-2">
              <strong>About:</strong> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore perferendis omnis expedita, labore debitis fugit dignissimos laborum esse quam corporis porro, ipsa adipisci, alias totam dolorem saepe itaque sapiente unde.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-1/4 ">
   <LiveChat/>
    </div>
   </div>
</div>    
    );
  }
  