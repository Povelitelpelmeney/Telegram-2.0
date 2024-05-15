import { useState } from "react";
import ChatsSidebar from "../ChatsSidebar/ChatsSidebar";
import LoginSidebar from "../LoginSidebar/LoginSidebar";
import "./SidebarContainer.scss";

const SidebarContainer = () => {
  const [sidebars, setSidebars] = useState<string[]>(["chats"]);
  const activeSidebar = sidebars[sidebars.length - 1];

  const openSidebar = (sidebarName: string) => {
    setSidebars((prevSidebars) => [...prevSidebars, sidebarName]);
  };

  const closeSidebar = () => {
    if (sidebars.length > 0)
      setSidebars((prevSidebars) => prevSidebars.slice(0, -1));
  };

  return (
    <div className="sidebar-container">
      {sidebars.map((sidebar, index) => {
        switch (sidebar) {
          case "chats":
            return (
              <ChatsSidebar
                key={index}
                onOpen={openSidebar}
                active={activeSidebar === "chats"}
              />
            );
          case "login":
            return (
              <LoginSidebar
                key={index}
                onClose={closeSidebar}
                active={activeSidebar === "login"}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SidebarContainer;
