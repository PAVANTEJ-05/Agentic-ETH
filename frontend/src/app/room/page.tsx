"use client";
import { useState } from 'react';
import Link from 'next/link';

  
 

export default function Room() {
  const [rooms, setRooms] = useState<{ 
    id: string; 
    link: string; 
    bots: string[]; 
    topic: string;
  }[]>([]);  const [bot1, setBot1] = useState("");
  const [bot2, setBot2] = useState("");
  const [topic, setTopic] = useState("");
  const [flag, setFlag] = useState(false);

  const roomId = () => {
    if (bot1 !== "" && bot2 !== "" && topic !== "" && bot1 !== bot2) {
      approve();
    } else {
      setFlag(true);
    }
  };

  const approve = async () => {
    const { v4 } = await import("uuid");
    const rid = v4().slice(0, 6);
    const roomLink = `./battle-royale/${rid}`;
    const details = { id: rid, link: roomLink, bots: [bot1, bot2], topic };
    setRooms((prev) => [...prev, details]);
    setFlag(false);
  };

  return (
    <div className="min-h-screen relative ">

      
      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2563EB] mb-4">
            Create Your Battle Arena
          </h1>
          <p className="text-gray-600">Place your bets on the ultimate showdown</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-12 max-w-3xl mx-auto border border-[#2563EB]/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First Contender
                </label>
                <select
                  value={bot1}
                  onChange={(e) => setBot1(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-[#2563EB]/20 bg-white text-gray-900 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                >
                  <option value="" disabled hidden>Choose your fighter</option>
                  <option value="Elon Musk">Elon Musk</option>
                  <option value="Narendra Modi">Narendra Modi</option>
                  <option value="Donald Trump">Donald Trump</option>
                  <option value="Andrew Tate">Andrew Tate</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Second Contender
                </label>
                <select
                  value={bot2}
                  onChange={(e) => setBot2(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-[#2563EB]/20 bg-white text-gray-900 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                >
                  <option value="" disabled hidden>Choose your fighter</option>
                  <option value="Elon Musk">Elon Musk</option>
                  <option value="Narendra Modi">Narendra Modi</option>
                  <option value="Donald Trump">Donald Trump</option>
                  <option value="Andrew Tate">Andrew Tate</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Battle Topic
                </label>
                <input
                  type="text"
                  placeholder="What's the fight about?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-[#2563EB]/20 bg-white text-gray-900 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
              </div>

              <button
                onClick={roomId}
                className="w-full py-4 px-6 text-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start The Battle!
              </button>
            </div>
          </div>

          {flag && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-[#EF4444] rounded-lg">
              <p className="text-[#EF4444]">
                Choose your fighters wisely! Fill all fields and select different contenders.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-xl   rounded-2xl shadow-xl p-8 border border-[#2563EB]/10">
          <h2 className="text-2xl font-bold text-[#2563EB] mb-6">Live Battle Arenas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Arena ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Battle Link
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Fighters
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Topic
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rooms.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8FAFC] transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{r.id}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={r.link}
                        className="text-[#2563EB] hover:text-[#1d4ed8] font-medium"
                      >
                        {r.link}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium">
                        {r.bots.join(" 🆚 ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{r.topic}</td>
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