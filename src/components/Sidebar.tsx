import { useCallback, useEffect, useState } from "react";
import {
  Scalars,
  Message,
  GetAvailableChatsQuery,
  useGetAvailableChatsLazyQuery,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
} from "../graphql";
import { LoadingSpin, Pen } from "./icons";
import ChatLink from "./ChatLink";

const Sidebar = () => {
  const [chats, setChats] = useState<GetAvailableChatsQuery["chats"]>([]);
  const [offset, setOffset] = useState(0);
  const [getChats, { subscribeToMore, loading, error }] =
    useGetAvailableChatsLazyQuery({
      fetchPolicy: "cache-and-network",
      variables: {
        first: 10,
      },
    });

  const modifyChatLastMessage = useCallback(
    (
      chats: GetAvailableChatsQuery["chats"],
      chatId: Scalars["ID"]["output"],
      newMessage: Message,
    ) => {
      return chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [newMessage] } : chat,
      );
    },
    [],
  );

  const subscribeToNewMessages = useCallback(
    (chatId: Scalars["ID"]["output"]) => {
      subscribeToMore<NewMessageSubscription, NewMessageSubscriptionVariables>({
        document: NewMessageDocument,
        variables: { chatId: chatId },
        updateQuery: (prevData, { subscriptionData }) => {
          if (!subscriptionData) return prevData;
          const newMessage = subscriptionData.data.newMessage;
          setChats((prevChats) =>
            modifyChatLastMessage(prevChats, chatId, newMessage),
          );
          return {
            chats: modifyChatLastMessage(prevData.chats, chatId, newMessage),
          } as GetAvailableChatsQuery;
        },
      });
    },
    [subscribeToMore, modifyChatLastMessage],
  );

  useEffect(() => {
    getChats({
      onCompleted: (data) => {
        setChats((prevChatIds) => [...prevChatIds, ...data.chats]);
        setOffset((prevOffset) => prevOffset + 10);
      },
    });
  }, [getChats, setChats, setOffset]);

  return (
    <div className="h-screen w-full overflow-y-auto border-2 border-slate-300 bg-white px-1 lg:w-1/4 dark:border-slate-900 dark:bg-slate-900">
      <main className="mb-4 flex h-auto w-full flex-col items-center">
        {chats.map((chat) => (
          <ChatLink
            key={chat.id}
            id={chat.id}
            type={chat.type}
            image={chat.image}
            name={chat.name}
            lastMessage={chat.messages.at(0)}
            meta={chat.meta}
            subscribeToNewMessages={() => subscribeToNewMessages(chat.id)}
          />
        ))}
        {loading && (
          <LoadingSpin className="mt-2 h-6 w-6 animate-spin dark:text-white" />
        )}
        {error && (
          <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
            {error.message.charAt(0).toUpperCase() + error.message.slice(1)}
          </p>
        )}
      </main>
      <div className="fixed bottom-7 right-7 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-400 shadow-[0_0_0_2px_rgba(0,_0,_255,_.5)] transition hover:bg-blue-500 active:scale-95 lg:right-[77%] dark:bg-indigo-400 dark:shadow-[0_0_0_2px_rgba(127,_0,_255,_.5)] dark:hover:bg-indigo-500">
        <Pen className="h-9 w-9 text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
