import React, { useState } from "react";
import SidebarInfo from "./Sidebar";
import { useMeQuery } from "../../graphql/index";

type SidebarType = {
  isOpen: boolean;
  setOpen: () => void;
};

const SidebarPersonalInfo = (Sidebar: SidebarType) => {
  const { isOpen, setOpen } = Sidebar;
  const handleEditAvatar = () => {
    alert("Edit Avatar clicked");
  };

  const handleEditChannelName = () => {
    alert("Edit Channel Name clicked");
  };

  const handleLogout = () => {
    alert("Delete Channel clicked");
  };
  const { data, loading, error } = useMeQuery({
    variables: {},
  });
  return (
    <div>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        avatar={data?.me?.image}
        name={data?.me?.name ? data?.me?.name : ""}
        onEditAvatar={handleEditAvatar}
        onEditChannelName={handleEditChannelName}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default SidebarPersonalInfo;
