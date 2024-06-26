import { memo, useCallback, useState } from "react";
import {
  ChatType,
  MessageFieldFragmentDoc,
  useGetAvailableChatsQuery,
  useNewMessagesSubscription,
} from "../../graphql";
import { useAppDispatch, useSidebarNavigation, useTheme } from "../../hooks";
import { Dark, LoadingSpin, Menu, Pen, Settings } from "../icons";
import { SidebarType } from "../../contexts/SidebarContext";
import { setToken } from "../../features/token/tokenSlice";
import ChatLink from "../ChatLink";
import InfiniteScroll from "../InfiniteScroll";
import ContextMenu from "../ContextMenu";

const ChatListSidebar = memo(() => {
  const dispatch = useAppDispatch();
  const { currentTheme, toggleTheme } = useTheme();
  const { fetchMore, data, loading, error } = useGetAvailableChatsQuery();
  const [offset, setOffset] = useState(data?.chats?.length || 10);
  const { openSidebar } = useSidebarNavigation();
  const [controlsMenuActive, setControlsMenuActive] = useState(false);
  const [createChatMenuActive, setCreateChatMenuActive] = useState(false);

  useNewMessagesSubscription({
    onData: ({ client, data }) => {
      const newMessageChatId = data.data?.newEvent.chat.id;
      const newMessage = data.data?.newEvent.message;

      client.cache.modify({
        id: client.cache.identify({
          __typename: "Chat",
          id: newMessageChatId,
        }),
        fields: {
          messages: (existing = []) => {
            const newMessageRef = client.cache.writeFragment({
              data: newMessage,
              fragment: MessageFieldFragmentDoc,
              fragmentName: "MessageField",
            });
            return [newMessageRef].concat(existing);
          },
        },
      });
    },
  });

  const loadChats = useCallback(async () => {
    await fetchMore({
      variables: { offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        setOffset((prevOffset) => prevOffset + fetchMoreResult.chats.length);
        return { ...prev, chats: prev.chats.concat(fetchMoreResult.chats) };
      },
    });
  }, [fetchMore, offset]);

  return (
    <div className="col-[1] row-[1] flex h-full w-0 min-w-full flex-col items-center overflow-y-auto border-2 bg-slate-100 dark:border-black dark:bg-slate-900">
      <header className="h-15 sticky top-0 flex w-full flex-row border-b-2 border-b-black bg-slate-100 px-2 dark:border-b-white dark:bg-slate-900">
        <div
          className={`mr-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800 ${controlsMenuActive && "rotate-90"}`}
          onClick={() => setControlsMenuActive(true)}
        >
          <Menu className="h-9 w-9 dark:text-white" />
        </div>
      </header>
      <ContextMenu
        className="flex flex-col rounded-2xl bg-slate-200 shadow dark:bg-slate-700 dark:text-white"
        active={controlsMenuActive}
        setActive={setControlsMenuActive}
      >
        <div
          className="inline-flex w-full cursor-pointer space-x-2 rounded-t-2xl p-2 hover:bg-slate-300 hover:dark:bg-slate-800"
          onClick={() => openSidebar({ type: SidebarType.SETTINGS })}
        >
          <Settings className="h-6 w-6" />
          <p>Settings</p>
        </div>
        <label
          className="inline-flex w-full cursor-pointer space-x-2 p-2 hover:bg-slate-300 hover:dark:bg-slate-800"
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
          className="w-full cursor-pointer rounded-b-2xl p-2 hover:bg-slate-300 hover:dark:bg-slate-800"
          onClick={() => dispatch(setToken(""))}
        >
          Logout
        </p>
      </ContextMenu>
      <main className="flex size-full flex-col items-center overflow-y-auto p-1">
        {data && (
          <>
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
      </main>
      <button
        className="fixed bottom-7 right-7 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 transition hover:bg-blue-600 active:scale-95 lg:right-[77%] dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
        onClick={() => setCreateChatMenuActive(true)}
      >
        <Pen className="h-9 w-9 text-white" />
      </button>
      <ContextMenu
        className="flex flex-col rounded-2xl bg-slate-200 text-white shadow-[0_0_0_2px] shadow-blue-600 hover:bg-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
        active={createChatMenuActive}
        setActive={setCreateChatMenuActive}
      >
        <p
          className="w-full cursor-pointer rounded-t-2xl bg-blue-500 p-2 hover:bg-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
          onClick={() =>
            openSidebar({
              type: SidebarType.CREATE_CHAT,
              chatType: ChatType.Private,
            })
          }
        >
          Create private chat
        </p>
        <p
          className="w-full cursor-pointer bg-blue-500 p-2 hover:bg-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
          onClick={() =>
            openSidebar({
              type: SidebarType.CREATE_CHAT,
              chatType: ChatType.Group,
            })
          }
        >
          Create group chat
        </p>
        <p
          className="w-full cursor-pointer rounded-b-2xl bg-blue-500 p-2 hover:bg-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
          onClick={() =>
            openSidebar({
              type: SidebarType.CREATE_CHAT,
              chatType: ChatType.Channel,
            })
          }
        >
          Create channel
        </p>
      </ContextMenu>
    </div>
  );
});

export default ChatListSidebar;
