import Link from "next/link";
import Image from "next/image";
import ImageSlider from "../components/carousel";
import Live from "../components/live";
import Category from "../components/category";
import Individual from "../components/individual";
import More from "../components/more";

export default function Creator() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-3 bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex items-center max-w-8xl mx-auto w-full px-4">
          <Link
            href="/creator"
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
          <div className="ml-auto">
            <div className="px-1 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Create a room
            </div>
          </div>
        </div>
      </header>
      <div className="pl-80 pt-16 pr-4">
        <ImageSlider />
        <Live />
        <More />
        <Category />
        <hr className="border-black" />
        <Individual label="Gaming" />
        <More />
        <Individual label="Sports" />
        <More />
        <Individual label="Politics" />
        <More />
        <Individual label="Movies" />
        <More />
        <Individual label="Casual" />
        <More />
      </div>
    </div>
  );
}
