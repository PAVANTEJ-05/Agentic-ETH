"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function Auth() {
  const { login, logout, user, ready } = usePrivy();

  if (!ready) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <div>
          <p>Connected as: {user.wallet?.address}</p>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={login} className="px-4 py-2 bg-blue-500 text-white">
          Login with Privy
        </button>
      )}
    </div>
  );
}
