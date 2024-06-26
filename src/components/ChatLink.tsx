import { memo } from "react";
import { Link } from "react-router-dom";
import { Scalars, ChatType, Message } from "../graphql";
import { formatChatDate, formatImage } from "../utils";
import { Muted } from "./icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { readNotification } from "../features/chat/chatSlice";

type ChatLinkProps = {
  id: Scalars["ID"]["output"];
  type: ChatType;
  image: Scalars["Base64"]["output"];
  lastMessage?: Message;
  name: Scalars["String"]["output"];
};

const ChatLink = memo(
  ({ id, type, image, lastMessage, name }: ChatLinkProps) => {
    const activeChat = useAppSelector((state) => state.chats.active);
    const mutedChats = useAppSelector((state) => state.chats.muted);
    const notifiedChats = useAppSelector((state) => state.chats.notified);
    const dispatch = useAppDispatch();

    return (
      <Link
        className={`grid h-20 w-full select-none grid-cols-[auto,_auto,_1fr] space-x-4 rounded-2xl p-2 ${activeChat === id ? "lg:bg-blue-300 lg:dark:bg-indigo-600" : "hover:bg-slate-200 dark:hover:bg-slate-800"}`}
        to={id}
        onClick={() => dispatch(readNotification(id))}
      >
        <span className="row-span-2 flex size-16 min-h-16 min-w-16 items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
          <img
            className="object-cover"
            src={formatImage({ base64: image, hash: id })}
            alt="Chat picture"
          />
        </span>
        <p className="overflow-hidden text-ellipsis text-nowrap text-lg font-semibold dark:text-white">
          {name}
        </p>
        <div className="-mt-2 inline-flex items-center justify-center justify-self-end text-nowrap text-slate-600 dark:text-slate-300">
          {mutedChats.includes(id) && <Muted className="mr-1 size-4" />}
          {lastMessage && formatChatDate(lastMessage.createdAt)}
        </div>
        {lastMessage &&
          (type === ChatType.Group ? (
            <div className="col-span-2 col-start-2 row-start-2 flex flex-row space-x-1">
              <p className="min-w-fit overflow-hidden text-ellipsis text-nowrap font-semibold dark:text-white">
                {lastMessage.createdBy.name}:
              </p>
              <div className="table w-full table-fixed text-slate-600 dark:text-slate-300">
                <p className="mr-1 table-cell w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
                  {lastMessage.text}
                </p>
              </div>
              {notifiedChats.includes(id) && (
                <div
                  className={`ml-auto mr-1 mt-0.5 size-5 min-h-5 min-w-5 rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 ${mutedChats.includes(id) && "bg-slate-400 shadow-slate-500 dark:bg-slate-500 dark:shadow-slate-600"}`}
                />
              )}
            </div>
          ) : (
            <>
              <div className="col-span-2 col-start-2 row-start-2 table w-full table-fixed text-slate-600 dark:text-slate-300">
                <p className="mr-1 table-cell w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
                  {lastMessage.text}
                </p>
              </div>
              {notifiedChats.includes(id) && (
                <div
                  className={`ml-auto mr-1 mt-0.5 size-5 min-h-5 min-w-5 rounded-full bg-blue-500 shadow-[0_0_0_2px] shadow-blue-600 dark:bg-indigo-500 dark:shadow-indigo-600 ${mutedChats.includes(id) && "bg-slate-400 shadow-slate-500 dark:bg-slate-500 dark:shadow-slate-600"}`}
                />
              )}
            </>
          ))}
      </Link>
    );
  },
);

export default ChatLink;
