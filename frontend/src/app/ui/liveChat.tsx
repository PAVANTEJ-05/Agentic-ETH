"use client";
import { useState } from "react";


export default function Live(){
    const [chat, setChat] = useState("");
    const uid =1;
    const send = () => {
      if (chat.trim() !== "") {
        const create = document.createElement("div");
        // Use "class" instead of "className" here
        create.innerHTML = `
          <div class="flex items-start gap-4 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
              uid:${uid}
            </div>
            <div class="p-2.5 bg-gray-200 rounded-full px-4">
              ${chat.trim()}
            </div>
          </div>
        `;
        document.getElementById("chat")?.append(create);
        setChat("");
      }
    };
    return(
        <aside className=" h-[92vh]  fixed top-16 right-0 border border-gray-700  overflow-hidden flex flex-col ">
        <div className="bg-red-600 p-4 font-bold text-black text-center">
          LIVE CHAT
        </div>
        
        <div className="flex-1 p-3 space-y-2 bg-gray-100 overflow-y-auto" id="chat">
    
        </div>
        
        <div className="p-3 flex bg-gray-300">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 pl-6 bg-gray-200 rounded-full outline-none p-2.5 gap-2"
            value={chat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChat(e.target.value)
                }
          />
          
          <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition"
          onClick={send}>
            Send
          </button>
        </div>
      </aside>
    );

}