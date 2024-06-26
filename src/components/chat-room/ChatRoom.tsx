import { memo } from "react";
import { useAppSelector } from "../../hooks";
import SidebarProvider from "../../contexts/SidebarContext";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useMatch } from "react-router-dom";

const ChatRoom = memo(() => {
  const atHome = useMatch("/");
  const activeChat = useAppSelector((state) => state.chats.active);

  return (
    <div
      className={`fixed left-0 top-0 flex size-full flex-col bg-slate-50 lg:static lg:w-3/4 dark:bg-slate-950 ${!atHome && "z-10"}`}
    >
      {activeChat && (
        <SidebarProvider className="fixed left-full size-full lg:w-1/4">
          <ChatHeader id={activeChat} />
          <ChatMessages id={activeChat} />
          <ChatInput id={activeChat} />
        </SidebarProvider>
      )}
    </div>
  );
});

export default ChatRoom;
