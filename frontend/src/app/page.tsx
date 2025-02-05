import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./components/carousel";
import Leaderboard from "./components/leaderboard";
import Live from "./components/live";
import Category from "./components/category";
import Auth from "@/auth/auth";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-3 bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex items-center max-w-8xl mx-auto w-full px-4">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 mr-auto"
          >
            <Image src="/assets/bg.png" alt="logo" width={60} height={40} />
            <h1 className="text-3xl font-bold text-gray-800">Kalesh</h1>
          </Link>
          <div className="mx-4 w-1/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="ml-auto">
            <div className="px-1 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              <Auth />
            </div>
          </div>
        </div>
      </header>

      <Leaderboard />

      <div className="pl-80 pt-16 pr-4">
        <ImageSlider />
        <Live />
        <hr className="border-black" />
        <Category />
      </div>
    </div>
  );
}
