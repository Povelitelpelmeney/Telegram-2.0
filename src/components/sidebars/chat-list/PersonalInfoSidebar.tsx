import React, { useState } from "react";
import SidebarInfo from "./BaseSidebar";
import {
  useMeQuery,
  useUpdateUserMutation,
  useSignInQuery,
} from "../../../graphql/index";

type SidebarType = {
  isOpen: boolean;
  setOpen: () => void;
};

const PersonalInfoSidebar = (Sidebar: SidebarType) => {
  const { isOpen, setOpen } = Sidebar;
  const handleEditAvatar = () => {
    // const file = e.target.files;
    // updateUserMutation(file);
  };

  const handleEditChannelName = () => {};

  const handleLogout = () => {};
  const { data: me } = useMeQuery();
  const [updateUserMutation] = useUpdateUserMutation({
    variables: {
      image: "",
    },
  });
  return (
    <div>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        me={me}
        onEditAvatar={handleEditAvatar}
        onEditChannelName={handleEditChannelName}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default PersonalInfoSidebar;
