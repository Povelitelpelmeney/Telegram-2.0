import React, { useState } from "react";
import SidebarInfo from "./Sidebar";
import { useUserQuery } from "../../graphql/index";

type SidebarType = {
  isOpen: boolean;
  setOpen: () => void;
};

const SidebarUserInfo = (Sidebar: SidebarType) => {
  const { isOpen, setOpen } = Sidebar;
  const { data, loading, error } = useUserQuery({
    variables: {
      login: "leva2",
    },
  });
  return (
    <div>
      <SidebarInfo
        isOpen={isOpen}
        setOpen={setOpen}
        avatar={data?.user?.image}
        name={data?.user?.name ? data?.user?.name : ""}
      />
    </div>
  );
};

export default SidebarUserInfo;
