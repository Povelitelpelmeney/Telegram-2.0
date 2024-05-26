import React, { useState } from "react";
// import ChatDocument from "../../graphql/index";
import SidebarInfo from "./Sidebar";
type SidebarType = {
  isOpen: boolean;
  setOpen: () => void;
};
const SidebarChatInfo = (Sidebar: SidebarType) => {
  const { isOpen, setOpen } = Sidebar;
  const handleEditAvatar = () => {
    alert("Edit Avatar clicked");
  };

  const handleEditChannelName = () => {
    alert("Edit Channel Name clicked");
  };

  const handleDeleteChannel = () => {
    alert("Delete Channel clicked");
  };
  return (
    <div>
      <button onClick={setOpen} className="rounded bg-blue-500 p-2 text-white">
        Open Sidebar
      </button>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        avatar="https://via.placeholder.com/100"
        channelName="О чём молчит Баффет?"
        description="Новости и мемы про инвестиции и экономику"
        onEditAvatar={handleEditAvatar}
        onEditChannelName={handleEditChannelName}
        onDeleteChannel={handleDeleteChannel}
      />
    </div>
  );
};

export default SidebarChatInfo;
