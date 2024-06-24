import React, { useState } from "react";
import SidebarInfo from "./BaseSidebar";
import { useUserQuery } from "../../../graphql/index";

type SidebarType = {
  isOpen: boolean;
  setOpen: (param: string) => void;
  login: string;
};

const UserInfoSidebar = (Sidebar: SidebarType) => {
  const { isOpen, setOpen, login } = Sidebar;
  const { data, loading, error } = useUserQuery({
    variables: {
      login: login,
    },
  });

  return (
    <div>
      <SidebarInfo isOpen={isOpen} setOpen={setOpen} data={data} />
    </div>
  );
};

export default UserInfoSidebar;
