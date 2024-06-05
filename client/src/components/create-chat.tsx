"use client";

import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/app-context";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

const CreateChat = () => {
  const [upload, setUpload] = React.useState<File | null>(null);
  const { setCurrentChatContext, setChatContextHistory, chatContextHistory } =
    useContext(AppContext);

  const createChat = () => {
    if (upload) {
      const chatId = uuidv4();

      // TODO: Upload the file to server
      const formData = new FormData();
      formData.append("file", upload);

      setCurrentChatContext(chatId);

      setChatContextHistory([...chatContextHistory, chatId]);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">
          Class Material
          <span className="text-primary text-xs ml-1">{"*pdf"}</span>
        </Label>
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          className="cursor-pointer mt-2"
          onChange={(e) => {
            if (e.target.files) {
              setUpload(e.target.files[0]);
            }
          }}
        />
        <Button className="bg-primary mt-2" onClick={createChat}>
          Create Chat
        </Button>
      </div>
    </div>
  );
};

export default CreateChat;
