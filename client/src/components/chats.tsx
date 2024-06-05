"use client";

import { AppContext } from "@/contexts/app-context";
import { Bot, UserRound } from "lucide-react";
import React, { useContext } from "react";

const AIChat = () => {
  return (
    <div className="flex flex-row items-center justify-start w-full h-16">
      <Bot className="w-12 h-12 bg-secondary rounded-full" />
      <div className="flex flex-col items-start justify-center ml-4">
        <p className="text-white">Tutr</p>
        <p className="text-white text-xs">Last Message</p>
      </div>
    </div>
  );
};

const UserChat = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-row items-center justify-end w-full h-16">
      <div className="flex flex-col items-end justify-center mr-4">
        <p className="text-white">{username}</p>
        <p className="text-white text-xs">Last Message</p>
      </div>
      <UserRound className="w-12 h-12 bg-secondary rounded-full" />
    </div>
  );
};

const Chats = ({ username }: { username: string }) => {
  const { chatState, currentChatContext } = useContext(AppContext);
  return (
    <div className="flex flex-col w-full h-full p-4 overflow-x-scroll gap-y-4">
      <p className="text-white text-left text-xs">
        Current Chat: {currentChatContext}
      </p>
      {chatState.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full rounded-lg bg-secondary">
          <p className="text-white">Ask Your Doubts !</p>
        </div>
      ) : (
        chatState.map((isUser) => {
          return isUser ? <UserChat username={username} /> : <AIChat />;
        })
      )}
    </div>
  );
};

export default Chats;
