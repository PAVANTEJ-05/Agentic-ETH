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
        // <div className="fixed h-1/3 w-1/3 top-10 left-1/2 transform -translate-x-1/2 bg-green-600 p-4 rounded shadow-md">
        //   <p className="font-bold  text-green-500">Wallet Created!</p>
        //   <p className="text-cyan-700"><strong className="text-gray-800">ID:</strong> {walletInfo.walletId}</p>
        //   <p><strong>Address:</strong> {walletInfo.walletAddress}</p>
        //   <button onClick={() => setWalletInfo(null)} className="mt-2 bg-red-500 text-white px-2 py-1 rounded">Close</button>
        // </div>
        

        <div className="w-full max-w-sm bg-white border mx-auto border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>
                
                <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{walletInfo.walletId}</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/assets/naruto.jpg" alt="Bonnie image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Wallet Created Succesfully</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{walletInfo.walletAddress}</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Fund Wallet</a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                </div>
            </div>
        </div>

              )}
            </div>
  );
}

// "use client";

// import { useState } from "react";
// import { usePrivy } from "@privy-io/react-auth";

// export default function CreateWallet() {
//   const { user, authenticated } = usePrivy();
//   const [walletInfo, setWalletInfo] = useState<{ walletId: string; walletAddress: string } | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleCreateWallet() {
//     if (!authenticated || !user?.id) {
//       alert("Please log in first.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("/api/create-wallet", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setWalletInfo({ walletId: data.walletId, walletAddress: data.walletAddress });
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Network error");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md space-y-6">
//         <button
//           onClick={handleCreateWallet}
//           disabled={loading}
//           className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
//                      transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           {loading ? "Creating Wallet..." : "Create Wallet"}
//         </button>

//         {walletInfo && (
//           <div className="bg-white shadow-xl rounded-xl overflow-hidden">
//             <div className="bg-blue-50 p-4 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-blue-800">Wallet Details</h2>
//               <button 
//                 onClick={() => setWalletInfo(null)}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex items-center space-x-4">
//                 <img 
//                   src="/assets/naruto.jpg" 
//                   alt="Wallet Avatar" 
//                   className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
//                 />
//                 <div>
//                   <p className="text-lg font-medium text-gray-800">Wallet Created Successfully</p>
//                   <p className="text-sm text-gray-500 truncate max-w-[250px]">{walletInfo.walletAddress}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <button 
//                   className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 
//                              transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Fund Wallet
//                 </button>
//                 <button 
//                   className="bg-white text-blue-600 border border-blue-600 py-2 
//                              rounded-lg hover:bg-blue-50 transition-colors 
//                              focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 >
//                   Message
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

