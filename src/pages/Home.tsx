import { memo, useEffect } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { setChat } from "../features/chat/chatSlice";
import { useAppDispatch, useAppSelector, useMediaQuery } from "../hooks";
import {
  MessageFieldFragmentDoc,
  useNewMessagesSubscription,
} from "../graphql";
import Sidebar from "../components/Sidebar";
import ChatRoom from "../components/chat-room/ChatRoom";

const Home = memo(() => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const isHome = useMatch("/");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

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

  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  useEffect(() => {
    if (id) dispatch(setChat(id));
  }, [id, dispatch]);

  return (
    <div className="fixed flex h-screen w-screen flex-row bg-slate-50 dark:bg-slate-950">
      {isLargeScreen ? (
        <>
          <Sidebar />
          <ChatRoom />
        </>
      ) : isHome ? (
        <Sidebar />
      ) : (
        <ChatRoom />
      )}
    </div>
  );
});

export default Home;
