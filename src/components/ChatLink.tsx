import { NavLink } from "react-router-dom";
import { ChatType, Message, Meta, Scalars } from "../graphql";
import { formatChatDate, formatImage } from "../utils";
import { useEffect } from "react";

type ChatLinkProps = {
  id: Scalars["ID"]["output"];
  type: ChatType;
  image?: Scalars["Base64"]["output"];
  name: Scalars["String"]["output"];
  lastMessage?: Message;
  meta: Meta[];
  subscribeToNewMessages: () => void;
};

const ChatLink = ({
  id,
  type,
  image,
  name,
  lastMessage,
  meta,
  subscribeToNewMessages,
}: ChatLinkProps) => {
  useEffect(() => {
    subscribeToNewMessages();
  }, [subscribeToNewMessages]);

  return (
    <NavLink
      className={({ isActive }) =>
        `grid h-20 w-full cursor-pointer select-none grid-cols-[auto,_auto,_auto,_1fr] rounded-2xl ${isActive ? "dark bg-indigo-600" : "hover:bg-slate-200 dark:hover:bg-slate-700"}`
      }
      to={`/${id}`}
    >
      <>
        <span className="row-span-2 m-2 flex h-16 w-16 content-center justify-center rounded-full border-2 border-black bg-white p-1">
          <img src={formatImage({ base64: image, hash: id })} alt="Image" />
        </span>
        <p className="col-span-2 overflow-hidden text-ellipsis pt-2 text-lg font-semibold dark:text-slate-50">
          {name}
        </p>
        {lastMessage && (
          <>
            <p className="justify-self-end pr-2 pt-2.5 text-base text-slate-600 dark:text-slate-300">
              {formatChatDate(lastMessage.createdAt)}
            </p>
            {type === ChatType.Group ? (
              <>
                <p className="col-start-2 row-start-2 overflow-hidden text-ellipsis pb-2 text-base font-semibold dark:text-slate-50">
                  {lastMessage.createdBy.name}:
                </p>
                <p className="col-span-2 row-start-2 overflow-hidden text-ellipsis pl-1 text-slate-600 dark:text-slate-300">
                  {lastMessage.text}
                </p>
              </>
            ) : (
              <p className="col-span-3 col-start-2 row-start-2 overflow-hidden text-ellipsis pb-2 text-slate-600 dark:text-slate-300">
                {lastMessage.text}
              </p>
            )}
          </>
        )}
      </>
    </NavLink>
  );
};

export default ChatLink;
