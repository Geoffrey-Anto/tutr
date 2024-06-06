"use client";

import { AppContext, ChatMessage } from "@/contexts/app-context";
import { Bot, UserRound } from "lucide-react";
import React, { useContext } from "react";
import Markdown from "react-markdown";

const AIChat = ({ chat }: { chat: ChatMessage }) => {
  return (
    <div className="flex flex-row items-center justify-start w-full">
      <Bot className="w-12 h-12 bg-secondary rounded-full" />
      <div className="flex flex-col items-start justify-center ml-4">
        <p className="text-primary">Tutr</p>
        <Markdown className="text-[16px] max-w-lg overflow-x-scroll">
          {chat.message}
        </Markdown>
      </div>
    </div>
  );
};

const UserChat = ({
  username,
  chat,
}: {
  username: string;
  chat: ChatMessage;
}) => {
  return (
    <div className="flex flex-row items-center justify-end w-full h-16">
      <div className="flex flex-col items-end justify-center mr-4">
        <p className="text-primary">{username}</p>
        <Markdown className="text-[16px]">{chat.message}</Markdown>
      </div>
      <UserRound className="w-12 h-12 bg-secondary rounded-full" />
    </div>
  );
};

const Chats = ({ username }: { username: string }) => {
  const { chatState, currentChatContext } = useContext(AppContext);
  return (
    <div className="flex flex-col w-full h-full p-4 overflow-x-scroll gap-y-4">
      <p className="text-left text-xs">
        Current Chat: {currentChatContext.substring(25)}
      </p>
      {chatState.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full rounded-lg bg-secondary">
          <p className="">Ask Your Doubts !</p>
        </div>
      ) : (
        chatState.map((chat) => {
          return chat.sender ? (
            <UserChat username={username} chat={chat} />
          ) : (
            <AIChat chat={chat} />
          );
        })
      )}
    </div>
  );
};

export default Chats;
