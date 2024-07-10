import { currentUser } from "@clerk/nextjs/server";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/Sidebar";
import ChatPage from "@/components/chat-page";
import { Landing } from '../components/landing';

export default async function Home() {
  const user = await currentUser();

  if (!user) return <Landing /> ;

  return (
    <main className="h-[calc(100vh-80px)]">
      <ResizablePanelGroup className="h-full" direction="horizontal">
        <ResizablePanel defaultSize={0.2}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-full" defaultSize={0.8}>
          <ChatPage username={user!.username!} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
