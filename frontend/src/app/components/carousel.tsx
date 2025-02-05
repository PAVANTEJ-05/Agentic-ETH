"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg"];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative mt-4">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={800}
          height={400}
          className={`transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setFade(true);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
