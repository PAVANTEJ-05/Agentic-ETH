"use client";

import ImageSlider from "./components/carousel";
import Live from "./components/live";
import Category from "./components/category";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import Individual from "./components/individual";
import More from "./components/more";
import Navbar from "./components/common-components/navbar";

export default function Home() {
  const { login, logout, user, ready } = usePrivy();
  const [display, setDisplay] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} setDisplay={setDisplay} logout={logout} display={display}/>
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
