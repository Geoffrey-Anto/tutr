"use client";

import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/contexts/app-context";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { toast } from "./ui/use-toast";

const CreateChat = () => {
  const [upload, setUpload] = React.useState<File | null>(null);
  const { setCurrentChatContext, setChatContextHistory, chatContextHistory } =
    useContext(AppContext);

  const createChat = async () => {
    if (upload) {
      const t = toast({
        title: "Uploading File...",
        variant: "default",
        duration: 1000000,
      });

      try {
        let chatId = uuidv4();
        chatId = chatId.replace(/-/g, "");
        chatId = "chat_" + chatId;
        chatId = chatId.substring(0, 25);
        chatId += upload.name
          .replace(/ /g, "_")
          .replace(" ", "_")
          .replace("-", "_")
          .replace(".", "_");

        const formData = new FormData();
        formData.append("file", upload);

        const requestOptions = {
          method: "POST",
          body: formData,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/add_document/${chatId}`,
          requestOptions
        );

        const _ = await res.text();

        setCurrentChatContext(chatId);

        setChatContextHistory([...chatContextHistory, chatId]);

        toast({
          title: "Chat Created Successfully!",
          variant: "default",
          duration: 5000,
        });
      } catch (e) {
        console.error(e);
        toast({
          title: "Failed To Upload File!",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        t.dismiss();
      }
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
