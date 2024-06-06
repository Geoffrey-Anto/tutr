"use client";

import { AppContext } from "@/contexts/app-context";
import React, { useContext } from "react";

const PreviousChats = () => {
  const {
    chatContextHistory,
    resetChatStatus,
    setCurrentChatContext,
    resetChatHistory,
  } = useContext(AppContext);
  return (
    <div className="mt-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-bold">Previous Chats</div>
        <div
          onClick={() => {
            resetChatHistory();
          }}
          className="text-primary cursor-pointer"
        >
          Clear
        </div>
      </div>
      {chatContextHistory.map((chat, idx) => {
        return (
          <div key={idx} className="flex flex-row items-center mt-4">
            <div className="flex flex-col ml-2">
              <div
                onClick={() => {
                  resetChatStatus();

                  setCurrentChatContext(chat);
                }}
                className="cursor-pointer text-sm font-bold"
              >
                {chat.substring(25)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PreviousChats;
