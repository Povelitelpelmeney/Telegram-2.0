import { useGetChatsQuery } from "./graphql";
import React, { useState } from "react";
import SidebarChatInfo from "./components/Sidebar/SidebarChatInfo";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const onSidebarOpen = () => {
    setSidebarOpen(!isSidebarOpen);
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
        onClick={onSidebarOpen}
        className="absolute inset-y-0.5 rounded  bg-blue-500 p-2 text-white"
      >
        Open Sidebar
      </button>
      <SidebarChatInfo isOpen={isSidebarOpen} setOpen={onSidebarOpen} />
      {data?.chats.map(({ id, name }) => (
        <p key={id} className="text-2xl text-slate-400 underline">
          {name}
        </p>
      ))}
    </div>
  );
};

export default App;
