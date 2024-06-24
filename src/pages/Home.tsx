import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setChat } from "../features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  MessageFieldFragmentDoc,
  useNewMessagesSubscription,
} from "../graphql";
import ChatRoom from "../components/chat-room/ChatRoom";
import SidebarProvider, { Sidebar } from "../contexts/SidebarContext";

const Home = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);

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
      <SidebarProvider
        className="m-0 grid h-full w-full border-2 border-slate-100 p-0 shadow lg:w-1/4 dark:border-slate-900"
        initialSidebar={Sidebar.CHAT_LIST}
      />
      <ChatRoom />
    </div>
  );
});

export default Home;
