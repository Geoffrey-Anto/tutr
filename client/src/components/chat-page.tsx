import React from "react";
import PromptTextArea from "./prompt-text-area";
import Chats from "./chats";

const ChatPage = ({ username }: { username: string }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-secondary">
      <Chats username={username} />
      <PromptTextArea />
    </div>
  );
};

export default ChatPage;
