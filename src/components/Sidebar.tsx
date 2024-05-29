import { memo, useCallback, useState } from "react";
import { useGetAvailableChatsQuery } from "../graphql";
import { useTheme } from "../hooks";
import { LoadingSpin, Pen } from "./icons";
import ChatLink from "./ChatLink";
import InfiniteScroll from "./InfiniteScroll";

const Sidebar = memo(() => {
  const { toggleTheme } = useTheme();
  const { fetchMore, data, loading, error } = useGetAvailableChatsQuery();
  const [offset, setOffset] = useState(data?.chats?.length || 10);

  const loadChats = useCallback(async () => {
    await fetchMore({
      variables: { offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.chats.length)
          throw new Error("Reached the end");
        return { ...prev, chats: prev.chats.concat(fetchMoreResult.chats) };
      },
    });
    setOffset((prevOffset) => prevOffset + 10);
  }, [fetchMore, offset]);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto border-2 border-slate-100 bg-slate-100 p-1 shadow lg:w-1/4 dark:border-slate-900 dark:bg-slate-900">
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
      <button
        onClick={toggleTheme}
        className="fixed bottom-7 right-7 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 transition hover:bg-blue-600 active:scale-95 lg:right-[77%] dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
      >
        <Pen className="h-9 w-9 text-white" />
      </button>
    </div>
  );
});

export default Sidebar;
