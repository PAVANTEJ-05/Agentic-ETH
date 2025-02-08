"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageSlider from "../components/carousel";
import Live from "../components/live";
import Category from "../components/category";
import Individual from "../components/individual";
import More from "../components/more";
import { CircleUserRound } from "lucide-react";

export default function Creator() {
  const [showMessage, setShowMessage] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowMessage(true);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

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
          <div className="ml-auto flex gap-3">
            <div className="px-1 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Create a room
            </div>
            <div>
              <CircleUserRound size={34} className="text-black" />
            </div>
          </div>
        </div>
      </header>

      <div className="pl-70">
        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
              <h1 className="text-gray-600 font-bold text-lg">
                Congratulations🎉
              </h1>
              <h2 className="text-lg font-semibold text-black">
                You have become a Creator
              </h2>
              <form action="submit">
                <div className="flex gap-4 mt-4">
                  <label className="text-black">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="border border-black text-black p-1 rounded-md"
                    required
                  />
                </div>

                <div className="flex gap-10 mt-4 items-center">
                  <label className="text-black">Profile picture</label>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-500 object-cover"
                      />
                    ) : (
                      <CircleUserRound size={30} className="text-black" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  onClick={() => {
                    setShowMessage(false);
                  }}
                  className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md"
                  type="submit"
                >
                  Save & Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="pl-80 pt-16 pr-4">
        <div className="relative z-0">
          <ImageSlider />
        </div>
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
