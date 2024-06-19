import { PropsWithChildren, createContext, memo, useState } from "react";
import ChatListSidebar from "../components/sidebars/chat-list/ChatListSidebar";

type SidebarContextType = {
  sidebars: Sidebar[];
  openSidebar: (sidebar: Sidebar) => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export enum Sidebar {
  CHAT_LIST,
  CHAT_INFO,
  USER_INFO,
  EDIT_CHAT,
  EDIT_USER,
}

type SidebarProviderProps = PropsWithChildren<{
  className?: string;
  initialSidebar?: Sidebar;
}>;

const SidebarProvider = memo(
  ({ children, className, initialSidebar }: SidebarProviderProps) => {
    const [sidebars, setSidebars] = useState<Sidebar[]>(
      initialSidebar !== undefined ? [initialSidebar] : [],
    );

    const openSidebar = (sidebar: Sidebar) => {
      setSidebars((prevSidebars) => [...prevSidebars, sidebar]);
    };

    const closeSidebar = () => {
      setSidebars((prevSidebars) => prevSidebars.slice(0, -1));
    };

    return (
      <SidebarContext.Provider value={{ sidebars, openSidebar, closeSidebar }}>
        {children}
        <div className={className}>
          {sidebars.map((sidebar, index) => {
            switch (sidebar) {
              case Sidebar.CHAT_LIST:
                return <ChatListSidebar key={index} />;
              default:
                break;
            }
          })}
        </div>
      </SidebarContext.Provider>
    );
  },
);

export default SidebarProvider;
