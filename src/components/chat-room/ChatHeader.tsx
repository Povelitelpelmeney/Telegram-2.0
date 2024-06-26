import { memo } from "react";
import { Link } from "react-router-dom";
import { Scalars, useGetChatInfoQuery } from "../../graphql";
import { formatImage } from "../../utils";
import {
  useAppSelector,
  useMediaQuery,
  useSidebarNavigation,
} from "../../hooks";
import { Arrow, Muted } from "../icons";
import { SidebarType } from "../../contexts/SidebarContext";

type ChatHeaderProps = {
  id: Scalars["ID"]["output"];
};

const ChatHeader = memo(({ id }: ChatHeaderProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const mutedChats = useAppSelector((state) => state.chats.muted);
  const { data, loading, error } = useGetChatInfoQuery({ variables: { id } });
  const { openSidebar, sidebars } = useSidebarNavigation();

  const handleChatInfo = () => {
    const lastSidebar = sidebars[sidebars.length - 1];
    if (lastSidebar?.type !== SidebarType.CHAT_INFO || lastSidebar?.id !== id)
      openSidebar({ type: SidebarType.CHAT_INFO, id });
  };

  return (
    <header className="flex h-16 w-full flex-row items-center justify-center border-2 bg-slate-100 dark:border-black dark:bg-slate-900">
      {loading && (
        <div className="flex size-full animate-pulse flex-row space-x-4 px-4 py-1.5">
          <div className="size-12 min-h-12 min-w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-2 w-36 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      )}
      {error && (
        <div className="flex h-16 w-full space-x-4 border-2 bg-slate-100 px-5 py-1.5 dark:border-black dark:bg-slate-900">
          <p className="mt-1 text-xl font-semibold text-red-700 dark:text-red-500">
            {error.message}
          </p>
        </div>
      )}
      {data && data.chat && (
        <>
          {!isLargeScreen && (
            <Link
              className="flex size-12 select-none items-center justify-center pl-2"
              to="/"
            >
              <Arrow className="size-10 rotate-180 text-slate-500 dark:text-slate-400" />
            </Link>
          )}
          <Link
            className="flex size-full flex-row space-x-4 px-4 py-1.5"
            to={`/${id}`}
            onClick={handleChatInfo}
          >
            <span className="flex size-12 min-h-12 min-w-12 items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
              <img
                className="object-cover"
                src={formatImage({ base64: data.chat.image, hash: id })}
                alt="Chat picture"
              />
            </span>
            <p className="inline-flex overflow-hidden text-ellipsis text-nowrap text-lg font-semibold dark:text-white">
              {data.chat.name}
              {mutedChats.includes(id) && (
                <Muted className="ml-1 mt-1 size-5" />
              )}
            </p>
          </Link>
        </>
      )}
    </header>
  );
});

export default ChatHeader;
