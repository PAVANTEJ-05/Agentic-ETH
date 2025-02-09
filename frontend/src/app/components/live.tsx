import React, { useRef } from "react";
import Image from "next/image";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import tut from "../../../public/assets/w2.jpg";

const LiveCard = ({ title, viewers, category }) => (
  <div className="flex-shrink-0 w-[360px] group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={tut}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
        <Flame className="w-4 h-4" />
        <span>LIVE</span>
      </div>

      <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
        {viewers} watching
      </div>
    </div>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{category}</p>
    </div>
  </div>
);

const Live = () => {
  const scrollContainerRef = useRef(null);

  const liveEvents = [
    { id: 1, title: "Elon vs Trump", viewers: "15.2K", category: "Politics" },
    { id: 2, title: "World Cup Finals", viewers: "28.5K", category: "Sports" },
    { id: 3, title: "Gaming Tournament", viewers: "12.8K", category: "Gaming" },
    {
      id: 4,
      title: "Music Festival",
      viewers: "22.1K",
      category: "Entertainment",
    },
    {
      id: 5,
      title: "Tech Conference",
      viewers: "18.9K",
      category: "Technology",
    },
    { id: 6, title: "Fashion Show", viewers: "20.3K", category: "Lifestyle" },
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
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-[#FF5F6D] to-[#7D00FF] bg-clip-text text-transparent">
            Live Now
          </h1>
          <div className="animate-pulse">
            <Flame className="w-8 h-8 text-red-500" />
          </div>
        </div>
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
          {liveEvents.map((event) => (
            <LiveCard
              key={event.id}
              title={event.title}
              viewers={event.viewers}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Live;
