"use client";

import React, { useContext } from "react";
import PromptTextArea from "./prompt-text-area";
import Chats from "./chats";
import { Badge } from "./ui/badge";
import { AppContext } from "@/contexts/app-context";

const ChatPage = ({ username }: { username: string }) => {
  const { setPromptType } = useContext(AppContext);

  return (
    <div className="w-full h-full flex flex-col justify-between bg-secondary">
      <Chats username={username} />
      <div className="flex flex-row items-center gap-x-4 justify-start w-full px-10 pt-2 bg-secondary">
        <Badge
          onClick={() => setPromptType("TEACH")}
          variant="default"
          className="cursor-pointer"
        >
          Teach
        </Badge>
        <Badge
          onClick={() => setPromptType("QUESTION")}
          variant="default"
          className="cursor-pointer"
        >
          Test
        </Badge>
      </div>
      <PromptTextArea />
    </div>
  );
};

export default ChatPage;
