import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const CenteredWalletModal = ({
  walletInfo,
  amount,
  setAmount,
  handleFundWallet,
  onClose,
}) => {
  if (!walletInfo) return null;

  const modalContent = (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 flex items-center justify-center">
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 w-full max-w-md rounded-lg">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Wallet Content */}
            <div className="p-6">
              <div className="flex flex-col items-center">
                <Image
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="/assets/naruto.jpg"
                  alt="Wallet Avatar"
                  width={96}
                  height={96}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  Wallet Created Successfully
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {walletInfo.walletAddress}
                </span>

                {/* Fund Wallet Section */}
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, "");
                      setAmount(value);
                    }}
                    placeholder="Enter ETH amount"
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    onClick={handleFundWallet}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Fund Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Use createPortal to render the modal at the document root
  return createPortal(modalContent, document.body);
};

export default CenteredWalletModal;
