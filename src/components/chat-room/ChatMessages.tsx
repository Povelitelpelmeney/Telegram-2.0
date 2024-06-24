import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Scalars,
  useGetChatMessagesLazyQuery,
  Message,
  useNewMessagesSubscription,
} from "../../graphql";
import InfiniteScroll from "../InfiniteScroll";
import ChatBubble from "./ChatBubble";
type ChatMessagesProps = {
  id: Scalars["ID"]["output"];
  userSidebarFunction: (param: string) => void;
};

const ChatMessages = memo(({ id, userSidebarFunction }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [getChatMessages] = useGetChatMessagesLazyQuery();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [offset, setOffset] = useState(0);
  const [sentMessage, setSentMessage] = useState(false);
  useNewMessagesSubscription({
    onData: ({ data }) => {
      if (!data.data) return;
      const newMessageChatId = data.data.newEvent.chat.id;
      const newMessage = data.data.newEvent.message;
      if (newMessageChatId !== id) return;
      setChatMessages((prevMessages) => [newMessage, ...prevMessages]);
      setSentMessage(true);
    },
  });

  const loadMessages = useCallback(async () => {
    const prevOffset = offset;
    setOffset((prevOffset) => prevOffset + 20);
    let errorMessage = "";
    await getChatMessages({
      variables: { id, offset: prevOffset, first: 20 },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (!data.chat) errorMessage = "can't access chat's messages";
        if (data.chat?.messages.length === 0) errorMessage = "reached the end";
        if (!errorMessage)
          setChatMessages((prevMessages) => [
            ...prevMessages,
            ...data.chat!.messages,
          ]);
      },
      onError: (error) => {
        errorMessage = error.message;
      },
    });
    if (errorMessage) throw new Error(errorMessage);
  }, [getChatMessages, id, offset]);

  const scrollToBottom = useCallback(() => {
    containerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, [containerRef.current]);

  useEffect(() => {
    setChatMessages([]);
    setOffset(0);
  }, [id]);

  useEffect(() => {
    if (sentMessage) {
      scrollToBottom();
      setSentMessage(false);
    }
  }, [sentMessage]);
  return (
    <main
      className="flex h-full w-full flex-col-reverse overflow-x-hidden px-10"
      ref={containerRef}
    >
      {chatMessages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
          userSidebarFunction={userSidebarFunction}
        />
      ))}
      <InfiniteScroll loadMore={loadMessages} />
    </main>
  );
});

export default ChatMessages;
