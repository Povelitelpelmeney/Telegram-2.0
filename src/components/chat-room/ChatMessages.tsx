import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Scalars,
  useGetChatMessagesLazyQuery,
  Message,
  useNewMessagesSubscription,
  useMeQuery,
} from "../../graphql";
import InfiniteScroll from "../InfiniteScroll";
import ChatBubble from "./ChatBubble";
import { Arrow } from "../icons";
import { useAppDispatch, useAppSelector, useMediaQuery } from "../../hooks";
import { readNotification } from "../../features/chat/chatSlice";
import { useMatch } from "react-router-dom";

type ChatMessagesProps = {
  id: Scalars["ID"]["output"];
};

const ChatMessages = memo(({ id }: ChatMessagesProps) => {
  const [atBottom, setAtBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const atChat = useMatch(`/${id}`);
  const activeChat = useAppSelector((state) => state.chats.active);
  const notifiedChats = useAppSelector((state) => state.chats.notified);
  const dispatch = useAppDispatch();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const { data: meData } = useMeQuery();
  const [getChatMessages] = useGetChatMessagesLazyQuery();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [messagesToAppend, setMessagesToAppend] = useState<Message[]>([]);
  const [offset, setOffset] = useState(0);
  const [sentMessage, setSentMessage] = useState(false);

  useNewMessagesSubscription({
    onData: ({ data }) => {
      if (!data.data) return;
      const newMessageChatId = data.data.newEvent.chat.id;
      const newMessage = data.data.newEvent.message;
      if (newMessageChatId !== id) return;
      if (chatMessages.some((message) => newMessage.id === message.id)) return;
      setChatMessages((prevMessages) => [newMessage, ...prevMessages]);

      if (newMessage.createdBy.login === meData?.me?.login)
        setSentMessage(true);
    },
  });

  const loadMessages = useCallback(async () => {
    await getChatMessages({
      variables: { id, offset, first: 20 },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (!data.chat) return;
        if (data.chat!.messages.length === 0) return;
        if (messagesToAppend.length > 0) return;
        setMessagesToAppend(data.chat!.messages);
      },
    });
  }, [getChatMessages, id, offset, messagesToAppend]);

  const scrollToBottom = useCallback(() => {
    containerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  useEffect(() => {
    setOffset(chatMessages.length);
  }, [chatMessages]);

  useEffect(() => {
    if (
      chatMessages.some((message) =>
        messagesToAppend.some((newMessage) => message.id === newMessage.id),
      ) ||
      messagesToAppend.some((newMessage) => newMessage.chatId !== id)
    )
      setMessagesToAppend([]);
    else if (messagesToAppend.length > 0) {
      setChatMessages((prevMessages) => [...prevMessages, ...messagesToAppend]);
      setMessagesToAppend([]);
    }
  }, [chatMessages, messagesToAppend, id]);

  useEffect(() => {
    const eventHandler = () => {
      if (!containerRef.current) return;
      if (containerRef.current.scrollTop > -10) setAtBottom(true);
      else setAtBottom(false);
    };

    const node = containerRef.current;
    if (!node) return;

    node.addEventListener("scroll", eventHandler);
    return () => node.removeEventListener("scroll", eventHandler);
  }, []);

  useEffect(() => {
    setOffset(0);
    setChatMessages([]);
  }, [id]);

  useEffect(() => {
    if (sentMessage) {
      scrollToBottom();
      setSentMessage(false);
    }
  }, [sentMessage, scrollToBottom]);

  useEffect(() => {
    if (
      atBottom &&
      notifiedChats.includes(id) &&
      (atChat || (activeChat === id && largeScreen))
    ) {
      dispatch(readNotification(id));
    }
  }, [atBottom, notifiedChats, atChat, activeChat, largeScreen, id, dispatch]);

  return (
    <>
      <main
        className="flex h-full w-full flex-col-reverse overflow-x-hidden px-2 lg:px-10"
        ref={containerRef}
      >
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <InfiniteScroll loadMore={loadMessages} />
      </main>
      <div
        className={`fixed bottom-24 right-6 flex h-12 w-12 animate-bounce cursor-pointer items-center justify-center rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 transition hover:bg-blue-600 lg:right-16 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600 ${atBottom ? "invisible opacity-0" : "visible opacity-100"}`}
        onClick={() => scrollToBottom()}
      >
        <Arrow className="h-9 w-9 rotate-90 text-white" />
      </div>
    </>
  );
});

export default ChatMessages;
