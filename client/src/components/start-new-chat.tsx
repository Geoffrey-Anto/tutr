"use client";
import { AppContext } from "@/contexts/app-context";
import { MessageSquare } from "lucide-react";
import React, { useContext } from "react";

const StartNewChat = () => {
  const { resetChatStatus } = useContext(AppContext);

  return (
    <div>
      <MessageSquare
        onClick={() => {
          resetChatStatus();
        }}
      />
    </div>
  );
};

export default StartNewChat;
