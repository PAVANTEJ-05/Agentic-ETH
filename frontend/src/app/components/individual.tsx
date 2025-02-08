import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tut from "../../../public/assets/w1.jpg"

interface IndividualProps {
  label: string;
}

const EventCard = ({ title }) => (
  <div className="flex-shrink-0 w-[360px] group cursor-pointer">
    <div className="relative overflow-hidden rounded-xl">
      <div className="aspect-video relative">
        <Image
          src={tut}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
    <div className="mt-3">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet</p>
    </div>
  </div>
);

const Individual = ({ label }: IndividualProps) => {
  const scrollContainerRef = useRef(null);

  const events = [
    { id: 1, title: "Elon vs Trump", image: "/assets/w1.jpg" },
    { id: 2, title: "Tech Summit 2025", image: "/assets/w1.jpg" },
    { id: 3, title: "Space X Launch", image: "/assets/w1.jpg" },
    { id: 4, title: "AI Conference", image: "/assets/w1.jpg" },
    { id: 5, title: "Startup Pitch", image: "/assets/w1.jpg" },
    { id: 6, title: "Web3 Summit", image: "/assets/w1.jpg" },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 380; // card width + gap
      const currentScroll = container.scrollLeft;

      container.scrollTo({
        left:
          currentScroll +
          (direction === "right" ? scrollAmount : -scrollAmount),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-br from-[#FF5F6D] to-[#7D00FF] bg-clip-text text-transparent">
          {label}
        </h1>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-0"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-0"
          style={{ transform: "translate(50%, -50%)" }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <EventCard key={event.id} title={event.title} image={event.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Individual;
