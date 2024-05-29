import { memo } from "react";
import { useAppSelector } from "../../hooks";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatRoom = memo(() => {
  const chat = useAppSelector((state) => state.chat);

  return (
    <div className="flex h-full w-full flex-col lg:w-3/4">
      {chat && (
        <>
          <ChatHeader id={chat} />
          <ChatMessages id={chat} />
          <ChatInput id={chat} />
        </>
      )}
    </div>
  );
});

export default ChatRoom;
