import { memo } from "react";
import {
  ChatType,
  Message,
  useGetChatInfoQuery,
  useMeQuery,
} from "../../graphql";

import { formatImage, formatMessageDate } from "../../utils";
import { useSidebarNavigation } from "../../hooks";
import { SidebarType } from "../../contexts/SidebarContext";

type ChatBubbleProps = {
  message: Message;
};

const ChatBubble = memo(({ message }: ChatBubbleProps) => {
  const { data: me } = useMeQuery();
  const { data: chat } = useGetChatInfoQuery({
    variables: { id: message.chatId },
  });
  const { openSidebar } = useSidebarNavigation();

  return (
    <div className="flex w-full items-center">
      {me &&
        chat &&
        chat.chat &&
        (me.me?.login === message.createdBy.login ? (
          <div className="m-3 -mr-2 flex w-full flex-row items-end justify-end gap-3 pl-1 pr-2.5">
            <div className="flex h-fit min-w-0 max-w-lg flex-row flex-wrap rounded-l-xl rounded-tr-xl bg-blue-200 p-2.5 dark:bg-indigo-800">
              <div className="max-w-full flex-auto overflow-hidden whitespace-pre-wrap text-wrap break-words align-baseline text-base dark:text-white">
                {message.text}
              </div>
              <div className="ml-auto mt-auto h-4 flex-[0_0_auto] whitespace-nowrap pl-2 align-baseline text-xs font-extralight text-slate-600 dark:text-slate-200">
                {formatMessageDate(message.createdAt)}
              </div>
            </div>
          </div>
        ) : (
          <div className="m-3 ml-1 flex w-full flex-row items-end gap-3">
            {chat.chat.type === ChatType.Group && (
              <span
                className="flex size-12 min-h-12 min-w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400"
                onClick={() =>
                  openSidebar({
                    type: SidebarType.USER_INFO,
                    id: message.createdBy.login,
                  })
                }
              >
                <img
                  className="object-fill"
                  src={formatImage({
                    base64: message.createdBy.image,
                    hash: message.createdBy.login,
                  })}
                  alt="Profile picture"
                />
              </span>
            )}
            <div className="mr-4 flex min-w-0 max-w-lg flex-col rounded-r-xl rounded-tl-xl bg-blue-100 p-2.5 dark:bg-indigo-600">
              {chat.chat.type !== ChatType.Private && (
                <div className="mb-1 align-baseline text-base font-medium dark:text-white">
                  {message.createdBy.name}
                </div>
              )}
              <div className="flex flex-wrap">
                <div className="flex-auto overflow-hidden whitespace-pre-wrap text-wrap break-words align-baseline text-base dark:text-white">
                  {message.text}
                </div>
                <div className="ml-auto mt-auto h-4 flex-[0_0_auto] whitespace-nowrap pl-2 align-baseline text-xs font-extralight text-slate-600 dark:text-slate-200">
                  {formatMessageDate(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
});

export default ChatBubble;
