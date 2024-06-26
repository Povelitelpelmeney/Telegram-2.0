import { memo, useEffect } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import useSound from "use-sound";
import { notifyChat, setActiveChat } from "../features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useMeQuery, useNewMessagesSubscription } from "../graphql";
import SidebarProvider, { SidebarType } from "../contexts/SidebarContext";
import ChatRoom from "../components/chat-room/ChatRoom";
import NotificationSound from "../assets/notification.mp3";

const Home = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const atRoot = useMatch("/");
  const [playNotificationSound] = useSound(NotificationSound);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const notifiedChats = useAppSelector((state) => state.chats.notified);
  const mutedChats = useAppSelector((state) => state.chats.muted);
  const { data: meData } = useMeQuery();

  useNewMessagesSubscription({
    onData: ({ data }) => {
      if (!data.data) return;

      const newMessageChatId = data.data.newEvent.chat.id;
      const newMessage = data.data.newEvent.message;
      if (newMessage.createdBy.login === meData?.me?.login) return;

      dispatch(notifyChat(newMessageChatId));

      if (!mutedChats.includes(newMessageChatId)) playNotificationSound();
    },
  });

  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  useEffect(() => {
    if (id) dispatch(setActiveChat(id));
  }, [id, dispatch]);

  useEffect(() => {
    const subtraction = notifiedChats.filter(
      (chat) => !mutedChats.includes(chat),
    );

    if (subtraction.length > 0) document.title = "New message";
    else document.title = "Kilogram";
  }, [notifiedChats, mutedChats]);

  return (
    <div className="fixed flex h-screen w-screen flex-row bg-slate-50 dark:bg-slate-950">
      <SidebarProvider
        className={`fixed left-0 top-0 grid h-full w-full border-slate-100 shadow lg:static lg:w-1/4 dark:border-slate-900 ${atRoot && "z-10"}`}
        initialSidebar={{ type: SidebarType.CHAT_LIST }}
      />
      <ChatRoom />
    </div>
  );
});

export default Home;
