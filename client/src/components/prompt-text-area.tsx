"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/contexts/app-context";
import { useContext, useState } from "react";
import { toast } from "./ui/use-toast";

export default function PromptTextArea() {
  const { promptType, currentChatContext, setChatState } =
    useContext(AppContext);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const createPrompt = async () => {
    if (prompt) {
      if (!currentChatContext) {
        toast({
          title: "Please create or select a chat first",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      setLoading(true);
      try {
        setChatState(((chatState: any) => [
          ...chatState,
          {
            message: prompt,
            sender: true,
            timestamp: new Date().toISOString(),
          },
          {
            message: "Loading...",
            sender: false,
            timestamp: new Date().toISOString(),
          },
        ]) as any);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          context_query: prompt,
          prompt: prompt,
          type: promptType,
        });

        setPrompt("");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER_URL}/prompt/${currentChatContext}`,
          requestOptions
        );

        const data = await res.text();

        setChatState(((chatState: any) => [
          ...chatState.slice(0, chatState.length - 1),
          {
            message: data,
            sender: false,
            timestamp: new Date().toISOString(),
          },
        ]) as any);
      } catch (e) {
        console.error(e);
        toast({
          title: "Failed To Create Prompt",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid mx-auto w-full px-10 py-5">
      <Textarea
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        value={prompt}
        className="h-12"
        placeholder={
          promptType === "TEACH"
            ? "Type your doubt here"
            : promptType === "QUESTION"
            ? "Type your topic to be questioned here"
            : "Type your message here"
        }
      />
      <Button
        disabled={loading || !prompt || !promptType || !currentChatContext}
        onClick={() => {
          createPrompt();
        }}
        className="mt-2 disabled:bg-secondary-foreground disabled:cursor-not-allowed"
      >
        Send
      </Button>
    </div>
  );
}
