"use client";
import Link from "next/link";
import { useState } from "react";

export default function Room() {
  const [rooms, setRooms] = useState<{ 
    id: string; 
    link: string; 
    bots: string[]; 
    topic: string;
  }[]>([]);
  const [bot1, setBot1] = useState("");
  const [bot2, setBot2] = useState("");
  const [topic, setTopic] = useState("");
  const [flag, setFlag] = useState(false);

  const roomId = () => {
    if(bot1 !== "" && bot2 !== "" && topic !== "" && bot1 !== bot2)
       approve(); 
    else setFlag(true);
  }

  const approve = async () => {
    const { v4 } = await import("uuid");
    const rid = v4().slice(0, 6);
    const roomLink = `./battle-royale/${rid}`;

    const details = {
      id: rid,
      link: roomLink,
      bots: [bot1, bot2],
      topic: topic,
    };

    setRooms((prev) => [...prev, details]);
    setFlag(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Battle Room</h1>
          <p className="text-gray-600">Set up an epic showdown between two personalities</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">First Contender</label>
                <select 
                  value={bot1} 
                  onChange={(e) => setBot1(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                >
                  <option value="" disabled hidden>Select a personality</option>
                  <option value="Elon Musk">Elon Musk</option>
                  <option value="Narendra Modi">Narendra Modi</option>
                  <option value="Donald Trump">Donald Trump</option>
                  <option value="Andrew Tate">Andrew Tate</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Second Contender</label>
                <select 
                  value={bot2} 
                  onChange={(e) => setBot2(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                >
                  <option value="" disabled hidden>Select a personality</option>
                  <option value="Elon Musk">Elon Musk</option>
                  <option value="Narendra Modi">Narendra Modi</option>
                  <option value="Donald Trump">Donald Trump</option>
                  <option value="Andrew Tate">Andrew Tate</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Debate Topic</label>
                <input 
                  type="text" 
                  placeholder="Enter the debate topic..." 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <button 
                onClick={roomId}
                className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Create Battle Room
              </button>
            </div>
          </div>

          {flag && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700">Please fill in all fields and select different personalities for the battle.</p>
            </div>
          )}
        </div>

        <div className="bg-white ml-55 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Battle Rooms</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Room ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Battle Link</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Contenders</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Topic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-500">{r.id}</td>
                    <td className="px-6 py-4">
                      <Link href={r.link} className="text-blue-600 hover:text-blue-800 font-medium">
                        {r.link}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="font-medium">{r.bots.join(" vs ")}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{r.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}