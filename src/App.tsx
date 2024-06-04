import { useGetChatsQuery } from "./graphql";
import React, { useState } from "react";
import SidebarChatInfo from "./components/Sidebar/SidebarChatInfo";
import SidebarUserInfo from "./components/Sidebar/SidebarUserInfo";
import SidebarPersonalInfo from "./components/Sidebar/SidebarPersonalInfo";

const App = () => {
  const [isSidebarChatOpen, setSidebarChatOpen] = useState(false);
  const [isSidebarUserOpen, setSidebarUserInfo] = useState(false);
  const [isSidebarPersonalOpen, setSidebarPersonalInfo] = useState(false);
  const onSidebarChatOpen = () => {
    setSidebarChatOpen(!isSidebarChatOpen);
    isSidebarUserOpen && setSidebarUserInfo(!isSidebarUserOpen);
  };
  const onSidebarUserOpen = () => {
    setSidebarUserInfo(!isSidebarUserOpen);
    isSidebarChatOpen && setSidebarChatOpen(!isSidebarChatOpen);
  };
  const onSidebarPersonalOpen = () => {
    setSidebarPersonalInfo(!isSidebarPersonalOpen);
  };
  const { data, error, loading } = useGetChatsQuery({
    variables: { offset: 0, first: 10 },
  });

  if (loading)
    return <p className="text-3xl text-blue-600 underline">Loading...</p>;
  if (error) return <p className="text-3xl text-red-600 underline">Error!</p>;
  return (
    <div className="flex flex-row">
      <button
        onClick={onSidebarChatOpen}
        className="absolute inset-y-0.5 rounded  bg-blue-500 p-2 text-white"
      >
        Open Chat
      </button>
      <button
        onClick={onSidebarUserOpen}
        className="absolute inset-y-0.5 left-40 rounded bg-blue-500 p-2 text-white"
      >
        Open User
      </button>
      <button
        onClick={onSidebarPersonalOpen}
        className="absolute inset-y-0.5 left-80 rounded bg-blue-500 p-2 text-white"
      >
        Open personal
      </button>
      <SidebarChatInfo isOpen={isSidebarChatOpen} setOpen={onSidebarChatOpen} />
      <SidebarUserInfo isOpen={isSidebarUserOpen} setOpen={onSidebarUserOpen} />
      <SidebarPersonalInfo
        isOpen={isSidebarPersonalOpen}
        setOpen={onSidebarPersonalOpen}
      />
      {data?.chats.map(({ id, name }) => (
        <p key={id} className="text-2xl text-slate-400 underline">
          {name}
        </p>
      ))}
    </div>
  );
};

export default App;
