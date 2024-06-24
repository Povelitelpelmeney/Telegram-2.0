import { memo, useState } from "react";
import { useAppSelector } from "../../hooks";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatInfoSidebar from "../sidebars/chat-list/ChatInfoSidebar";
import UserInfoSidebar from "../sidebars/chat-list/UserInfoSidebar";

const ChatRoom = memo(() => {
  const chat = useAppSelector((state) => state.chat);
  const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setUserSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>(String);
  const onChatSidebarOpen = () => {
    setChatSidebarOpen(!isChatSidebarOpen);
    isUserSidebarOpen && setUserSidebarOpen(!isUserSidebarOpen);
  };
  const onUserSidebarOpen = () => {
    if (isChatSidebarOpen) setChatSidebarOpen(!isChatSidebarOpen);
    setUserSidebarOpen(!isUserSidebarOpen);
  };
  const onUserSidebarUse = (param: string) => {
    onUserSidebarOpen();
    const temp = isUserSidebarOpen;
    setCurrentUser(param);
    if (isUserSidebarOpen && param != currentUser) {
      setUserSidebarOpen(temp);
    }
  };
  return (
    <div className="flex h-full w-full flex-col lg:w-3/4">
      {chat && (
        <>
          <ChatHeader id={chat} chatInfoSidebarFunction={onChatSidebarOpen} />
          <ChatMessages id={chat} userSidebarFunction={onUserSidebarUse} />
          <ChatInput
            id={chat}
            isSidebarOpened={isUserSidebarOpen || isChatSidebarOpen}
          />
          <ChatInfoSidebar
            isOpen={isChatSidebarOpen}
            setOpen={onChatSidebarOpen}
            id={chat}
          />
          <UserInfoSidebar
            isOpen={isUserSidebarOpen}
            setOpen={onUserSidebarUse}
            login={currentUser}
          />
        </>
      )}
    </div>
  );
});

export default ChatRoom;
