import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PromptTextArea() {
  return (
    <div className="grid mx-auto w-full px-10 py-5">
      <Textarea className="h-12" placeholder="Type your message here." />
      <Button className="mt-2">Send</Button>
    </div>
  );
}
