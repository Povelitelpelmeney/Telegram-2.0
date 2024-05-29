import { memo, useCallback, useEffect, useState } from "react";
import { useGetChatMessagesQuery, Scalars, ChatType } from "../../graphql";
import InfiniteScroll from "../InfiniteScroll";
import ChatBubble from "./ChatBubble";

type ChatMessagesProps = {
  id: Scalars["ID"]["output"];
};

const ChatMessages = memo(({ id }: ChatMessagesProps) => {
  const { fetchMore, data } = useGetChatMessagesQuery({ variables: { id } });
  const [offset, setOffset] = useState(data?.chat?.messages.length || 10);

  useEffect(() => {
    setOffset(data?.chat?.messages.length || 10);
  }, [id, data?.chat?.messages.length]);

  const loadMessages = useCallback(async () => {
    await fetchMore({
      variables: { id, offset, first: 10 },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(prev, fetchMoreResult);
        if (!fetchMoreResult || !fetchMoreResult.chat?.messages.length)
          throw new Error("Reached the end");

        return prev.chat
          ? {
              ...prev,
              chat: {
                ...prev.chat,
                messages: prev.chat.messages.concat(
                  fetchMoreResult.chat.messages,
                ),
              },
            }
          : fetchMoreResult;
      },
    });
  }, [fetchMore, id, offset]);

  return (
    <main className="flex h-full w-full flex-col-reverse overflow-x-hidden px-10">
      {data && data.chat && (
        <>
          {data.chat.messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          <InfiniteScroll loadMore={loadMessages} />
        </>
      )}
    </main>
  );
});

export default ChatMessages;
