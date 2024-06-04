import React, { useState } from "react";
import { useChatQuery } from "../../graphql/index";

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
  const { data, loading, error } = useChatQuery({
    variables: {
      id: "d",
    },
  });

  return (
    <div>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        avatar={data?.chat?.image}
        channelName={data?.chat?.name ? data?.chat?.name : ""}
        onEditAvatar={handleEditAvatar}
        onEditChannelName={handleEditChannelName}
        onDeleteChannel={handleDeleteChannel}
      />
    </div>
  );
};

export default SidebarChatInfo;
