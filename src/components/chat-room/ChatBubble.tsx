import { memo } from "react";
import {
  ChatType,
  Message,
  useGetChatInfoQuery,
  useMeQuery,
} from "../../graphql";
import { formatImage, formatMessageDate } from "../../utils";

type ChatBubbleProps = {
  message: Message;
};

const ChatBubble = memo(({ message }: ChatBubbleProps) => {
  const { data: me } = useMeQuery();
  const { data: chat } = useGetChatInfoQuery({
    variables: { id: message.chatId },
  });

  return (
    <div className="flex w-full items-center">
      {me &&
        chat &&
        chat.chat &&
        (me.me?.login === message.createdBy.login ? (
          <div className="m-3 flex flex-row items-end ml-auto gap-3">
            <div className="flex h-fit max-w-lg flex-wrap flex-row rounded-l-xl rounded-tr-xl bg-green-100 dark:bg-purple-300 p-2.5">
                <div className="whitespace-pre-wrap text-wrap break-all align-baseline text-base ">
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
              <span className="flex size-12 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
                <img
                  className="size-8 object-cover"
                  src={formatImage({
                    base64: message.createdBy.image,
                    hash: message.createdBy.login,
                  })}
                  alt="Image"
                />
              </span>
            )}
            <div className="flex h-fit max-w-lg flex-col rounded-r-xl rounded-tl-xl bg-green-100 dark:bg-purple-300 p-2.5">
              {chat.chat.type !== ChatType.Private && (
                <div className="mb-1 w-full text-base font-semibold">
                  {message.createdBy.name}
                </div>
              )}
              <div className="flex h-fit w-full flex-wrap">
                <div className="whitespace-pre-wrap text-wrap break-all align-baseline text-base ">
                  {message.text}
                </div>
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
