import {
  PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useState,
} from "react";
import { ChatType } from "../graphql";
import ChatListSidebar from "../components/sidebars/ChatListSidebar";
import SettingsSidebar from "../components/sidebars/SettingsSidebar";
import EditProfileSidebar from "../components/sidebars/EditProfileSidebar";
import CreateChatSidebar from "../components/sidebars/CreateChatSidebar";
import UserInfoSidebar from "../components/sidebars/UserInfoSidebar";
import ChatInfoSidebar from "../components/sidebars/ChatInfoSidebar";
import EditChatSidebar from "../components/sidebars/EditChatSidebar";

type SidebarContextType = {
  sidebars: Sidebar[];
  openSidebar: (sidebar: Sidebar) => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export enum SidebarType {
  CHAT_LIST,
  SETTINGS,
  EDIT_PROFILE,
  CREATE_CHAT,
  CHAT_INFO,
  USER_INFO,
  EDIT_CHAT,
}

type Sidebar =
  | {
      type:
        | SidebarType.CHAT_LIST
        | SidebarType.SETTINGS
        | SidebarType.EDIT_PROFILE;
    }
  | {
      type: SidebarType.CREATE_CHAT;
      chatType: ChatType;
    }
  | {
      type:
        | SidebarType.USER_INFO
        | SidebarType.CHAT_INFO
        | SidebarType.EDIT_CHAT;
      id: string;
    };

type SidebarProviderProps = PropsWithChildren<{
  className?: string;
  initialSidebar?: Sidebar;
}>;

const SidebarProvider = memo(
  ({ children, className, initialSidebar }: SidebarProviderProps) => {
    const [sidebars, setSidebars] = useState<Sidebar[]>(
      initialSidebar !== undefined ? [initialSidebar] : [],
    );

    const openSidebar = useCallback((sidebar: Sidebar) => {
      setSidebars((prevSidebars) => [...prevSidebars, sidebar]);
    }, []);

    const closeSidebar = useCallback(() => {
      setSidebars((prevSidebars) => prevSidebars.slice(0, -1));
    }, []);

    return (
      <SidebarContext.Provider value={{ sidebars, openSidebar, closeSidebar }}>
        {children}
        <div className={className}>
          {sidebars.map((sidebar, index) => {
            switch (sidebar.type) {
              case SidebarType.CHAT_LIST:
                return <ChatListSidebar key={index} />;
              case SidebarType.SETTINGS:
                return <SettingsSidebar key={index} />;
              case SidebarType.EDIT_PROFILE:
                return <EditProfileSidebar key={index} />;
              case SidebarType.CREATE_CHAT:
                return (
                  <CreateChatSidebar key={index} type={sidebar.chatType} />
                );
              case SidebarType.USER_INFO:
                return <UserInfoSidebar key={index} login={sidebar.id} />;
              case SidebarType.CHAT_INFO:
                return <ChatInfoSidebar key={index} id={sidebar.id} />;
              case SidebarType.EDIT_CHAT:
                return <EditChatSidebar key={index} id={sidebar.id} />;
              default:
                return null;
            }
          })}
        </div>
      </SidebarContext.Provider>
    );
  },
);

export default SidebarProvider;
