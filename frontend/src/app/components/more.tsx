"use client";
import Card from "./card";
import { useState } from "react";
import Image from "next/image";

export default function More() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-black hover:underline"
        >
          Show more <span className="ml-1">▶</span>
        </button>
      )}

      {isExpanded && (
        <div className="flex flex-col">
          <div className="flex gap-9 pt-4">
            <div>
              <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
              <Card title="Elon vs Trump" />
            </div>
            <div>
              <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
              <Card title="Elon vs Trump" />
            </div>
            <div>
              <Image src="/assets/w1.jpg" alt="logo" width={360} height={250} />
              <Card title="Elon vs Trump" />
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-black hover:underline pt-4"
          >
            Show less <span className="ml-1">▲</span>
          </button>
        </div>
      )}
    </div>
  );
}
