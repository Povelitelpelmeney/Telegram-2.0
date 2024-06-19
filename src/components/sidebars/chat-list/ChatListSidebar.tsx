import { memo, useCallback, useState } from "react";
import { useGetAvailableChatsQuery } from "../../../graphql";
import { useAppDispatch, useSidebarNavigation, useTheme } from "../../../hooks";
import { Dark, LoadingSpin, Menu, Pen, Settings } from "../../icons";
import ChatLink from "./ChatLink";
import InfiniteScroll from "../../InfiniteScroll";
import ContextMenu from "../../ContextMenu";
import { Sidebar } from "../../../contexts/SidebarContext";
import { setToken } from "../../../features/token/tokenSlice";
import { useNavigate } from "react-router-dom";

const ChatListSidebar = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentTheme, toggleTheme } = useTheme();
  const { fetchMore, data, loading, error } = useGetAvailableChatsQuery();
  const [offset, setOffset] = useState(data?.chats?.length || 10);
  const { openSidebar } = useSidebarNavigation();
  const [controlsMenuActive, setControlsMenuActive] = useState(false);
  const [createChatMenuActive, setCreateChatMenuActive] = useState(false);

  const loadChats = useCallback(async () => {
    await fetchMore({
      variables: { offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.chats.length)
          throw new Error("reached the end");
        return { ...prev, chats: prev.chats.concat(fetchMoreResult.chats) };
      },
    });
    setOffset((prevOffset) => prevOffset + 10);
  }, [fetchMore, offset]);

  const logout = () => {
    dispatch(setToken(""));
    navigate("/signin");
  };

  return (
    <div className="col-[1] row-[1] flex h-full w-full flex-col items-center overflow-y-auto bg-slate-100 p-1 pt-0 dark:bg-slate-900">
      {data && (
        <>
          <header className="h-15 sticky top-0 flex w-full flex-row border-b-2 border-b-black bg-slate-100 px-2 dark:border-b-white dark:bg-slate-900">
            <div
              className={`mr-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800 ${controlsMenuActive && "rotate-90"}`}
              onClick={() => setControlsMenuActive(true)}
            >
              <Menu className="h-9 w-9 dark:text-white" />
            </div>
          </header>
          <ContextMenu
            className="flex flex-col rounded-2xl bg-slate-200 shadow dark:bg-slate-700"
            active={controlsMenuActive}
            setActive={setControlsMenuActive}
          >
            <div
              className="inline-flex w-full cursor-pointer space-x-2 rounded-t-2xl p-2 transition hover:bg-slate-300 dark:text-white hover:dark:bg-slate-800"
              // onClick={() => openSidebar(Sidebar.USER_INFO)}
            >
              <Settings className="h-6 w-6" />
              <p>Settings</p>
            </div>
            <label
              className="inline-flex w-full cursor-pointer space-x-2 p-2 transition hover:bg-slate-300 dark:text-white hover:dark:bg-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Dark className="h-6 w-6" />
              <p>Dark</p>
              <input
                className="peer sr-only"
                type="checkbox"
                defaultChecked={currentTheme === "dark"}
                onChange={toggleTheme}
                value=""
              />
              <div className="peer relative h-6 w-11 rounded-full bg-slate-400 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-slate-500" />
            </label>
            <p
              className="w-full cursor-pointer rounded-b-2xl p-2 transition hover:bg-slate-300 dark:text-white hover:dark:bg-slate-800"
              onClick={logout}
            >
              Logout
            </p>
          </ContextMenu>
          {data.chats.map((chat) => (
            <ChatLink
              key={chat.id}
              id={chat.id}
              type={chat.type}
              image={chat.image}
              lastMessage={chat.messages.at(0)}
              name={chat.name}
            />
          ))}
          <InfiniteScroll loadMore={loadChats} />
        </>
      )}
      {loading && (
        <LoadingSpin className="mt-2 h-6 w-6 animate-spin dark:text-white" />
      )}
      {error && (
        <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
          {error.message}
        </p>
      )}
      <button className="fixed bottom-7 right-7 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 transition hover:bg-blue-600 active:scale-95 lg:right-[77%] dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600">
        <Pen className="h-9 w-9 text-white" />
      </button>
    </div>
  );
});

export default ChatListSidebar;
