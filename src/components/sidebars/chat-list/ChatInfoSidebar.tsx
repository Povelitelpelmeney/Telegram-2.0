import React, { useState } from "react";
import { useChatQuery, useMeQuery } from "../../../graphql/index";

import SidebarInfo from "./BaseSidebar";
type SidebarType = {
  isOpen: boolean;
  setOpen: () => void;
  id: string;
};
const ChatInfoSidebar = (Sidebar: SidebarType) => {
  const { isOpen, setOpen, id } = Sidebar;
  const handleEditAvatar = () => {
    alert("Edit Avatar clicked");
  };

  const handleEditChannelName = () => {
    alert("Edit Channel Name clicked");
  };

  const handleDeleteChannel = () => {
    alert("Delete Channel clicked");
  };
  const { data: chat } = useChatQuery({
    variables: {
      id: id,
    },
  });
  const { data: me } = useMeQuery();
  return (
    <div>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        chat={chat}
        onEditAvatar={
          chat?.chat?.owner?.login == me?.me?.login
            ? handleEditAvatar
            : undefined
        }
        onEditChannelName={
          chat?.chat?.owner?.login == me?.me?.login
            ? handleEditChannelName
            : undefined
        }
        onDeleteChannel={
          chat?.chat?.owner?.login == me?.me?.login
            ? handleDeleteChannel
            : undefined
        }
      />
    </div>
  );
};

export default ChatInfoSidebar;
