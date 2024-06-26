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
          <div className="m-3 ml-auto flex flex-row items-end gap-3">
            <div className="flex h-fit max-w-lg flex-row flex-wrap rounded-l-xl rounded-tr-xl bg-green-100 p-2.5 dark:bg-purple-300">
              <div className="whitespace-break-spaces text-wrap break-all align-baseline text-base ">
                {message.text}
              </div>
              <div className="ml-auto mt-auto pl-2 align-baseline text-xs text-slate-600">
                {formatMessageDate(message.createdAt)}
              </div>
            </div>
          </div>
        ) : (
          <div className="m-3 flex flex-row items-end gap-3">
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
            <div className="flex h-fit max-w-lg break-words flex-col rounded-r-xl rounded-tl-xl bg-green-100 p-2.5 dark:bg-purple-300">
              {chat.chat.type !== ChatType.Private && (
                <div className="mb-1 w-full text-base font-semibold">
                  {message.createdBy.name}
                </div>
              )}
              <div className="flex h-fit w-full flex-wrap">
                <p className="whitespace-break-spaces max-w-[31rem] text-wrap break-words align-baseline text-base ">
                  {message.text}
                </p>
                <div className="ml-auto mt-auto pl-2 align-baseline text-xs text-slate-600">
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
