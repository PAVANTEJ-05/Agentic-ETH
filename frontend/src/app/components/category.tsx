"use client";
import React from "react";
import { Volleyball, Gamepad2, Landmark, Film, Coffee } from "lucide-react";

const Category = () => {
  const categories = [
    { name: "Gaming", icon: Gamepad2, bgColor: "bg-purple-700" },
    { name: "Sports", icon: Volleyball, bgColor: "bg-purple-700" },
    { name: "Politics", icon: Landmark, bgColor: "bg-purple-700" },
    { name: "Movies", icon: Film, bgColor: "bg-purple-700" },
    { name: "Casual", icon: Coffee, bgColor: "bg-purple-700" },
  ];

  return (
    <div className="pb-4">
      <h1 className="text-black text-4xl font-bold pt-4">Categories</h1>
      <nav className="flex space-x-2 p-2 pt-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`
            ${category.bgColor} 
            flex-1 flex flex-col items-center justify-center 
            py-3 rounded-lg 
            hover:brightness-110 
            transition-all 
            cursor-pointer 
            space-y-2
          `}
          >
            <category.icon className="text-white" size={32} />
            <span className="text-white text-sm font-semibold">
              {category.name}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Category;
