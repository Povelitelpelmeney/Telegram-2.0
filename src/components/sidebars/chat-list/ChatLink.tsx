import { memo } from "react";
import { Link } from "react-router-dom";
import { Scalars, ChatType, Message } from "../../../graphql";
import { formatChatDate, formatImage } from "../../../utils";

type ChatLinkProps = {
  id: Scalars["ID"]["output"];
  type: ChatType;
  image: Scalars["Base64"]["output"];
  lastMessage?: Message;
  name: Scalars["String"]["output"];
};

const ChatLink = memo(
  ({ id, type, image, lastMessage, name }: ChatLinkProps) => {
    return (
      <Link
        className="grid h-20 w-full select-none grid-cols-[auto,_auto,_1fr] space-x-4 rounded-2xl p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
        to={id}
      >
        <span className="row-span-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
          <img
            src={formatImage({ base64: image, hash: id })}
            alt="Chat image"
          />
        </span>
        <p className="overflow-hidden text-ellipsis text-nowrap text-lg font-semibold dark:text-white">
          {name}
        </p>
        {lastMessage && (
          <>
            <p className="justify-self-end text-nowrap text-slate-600 dark:text-slate-300">
              {formatChatDate(lastMessage.createdAt)}
            </p>
            {type === ChatType.Group ? (
              <div className="col-span-2 col-start-2 row-start-2 flex flex-row space-x-1">
                <p className="min-w-fit overflow-hidden text-ellipsis text-nowrap font-semibold dark:text-white">
                  {lastMessage.createdBy.name}:
                </p>
                <p className="overflow-hidden text-ellipsis text-nowrap text-slate-600 dark:text-slate-300">
                  {lastMessage.text}
                </p>
              </div>
            ) : (
              <p className="col-span-2 col-start-2 row-start-2 overflow-hidden text-ellipsis text-nowrap text-slate-600 dark:text-slate-300">
                {lastMessage.text}
              </p>
            )}
          </>
        )}
      </Link>
    );
  },
);

export default ChatLink;
