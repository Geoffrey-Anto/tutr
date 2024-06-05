import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StartNewChat from "./start-new-chat";
import CreateChat from "./create-chat";
import PreviousChats from "./previous-chats";

const Sidebar = () => {
  return (
    <div className="h-full p-4">
      <div className="w-full flex flex-row justify-between items-center py-2">
        <div></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <StartNewChat />
            </TooltipTrigger>
            <TooltipContent>
              <p>Start New Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="mt-4">
        <span className="text-primary">Upload</span> Your Class Materials To Get
        Started!
      </p>
      <CreateChat />
      <PreviousChats />
    </div>
  );
};

export default Sidebar;
