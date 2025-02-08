import Link from "next/link";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

export default function Room() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <header className="p-3 bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex items-center max-w-8xl mx-auto w-full px-4">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 mr-auto"
          >
            <Image src="/assets/logo.jpg" alt="logo" width={35} height={35} />
            <h1 className="text-3xl font-bold text-gray-800">Kalesh</h1>
          </Link>
          <div className="mx-4 w-1/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="ml-auto flex gap-3">
            <div>
              <CircleUserRound size={34} className="text-black" />
            </div>
          </div>
        </div>
      </header>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Settings</h1>

      <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Bot 1 Dropdown */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">
            Bot 1
          </label>
          <select
            name="bots"
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Select a bot
            </option>
            <option value="elonMusk">Elon Musk</option>
            <option value="narendraModi">Narendra Modi</option>
            <option value="donaldTrump">Donald Trump</option>
            <option value="andrewTate">Andrew Tate</option>
          </select>
        </div>

        {/* Bot 2 Dropdown */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">
            Bot 2
          </label>
          <select
            name="bots"
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Select a bot
            </option>
            <option value="elonMusk">Elon Musk</option>
            <option value="narendraModi">Narendra Modi</option>
            <option value="donaldTrump">Donald Trump</option>
            <option value="andrewTate">Andrew Tate</option>
          </select>
        </div>
      </div>
      <div>
        <button className="text-black rounded-xl text-3xl bg-green-500  hover:bg-green-600 border-black p-5">
          Create room
        </button>
      </div>
    </div>
  );
}
