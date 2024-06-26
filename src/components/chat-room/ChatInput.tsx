import { KeyboardEvent, memo, useCallback, useEffect, useRef } from "react";
import {
  ChatType,
  Scalars,
  useGetChatInfoQuery,
  useMeQuery,
  useSendMessageMutation,
} from "../../graphql";
import { PaperPlane } from "../icons";

type ChatInputProps = {
  id: Scalars["ID"]["output"];
};

const ChatInput = memo(({ id }: ChatInputProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const { data: chat } = useGetChatInfoQuery({ variables: { id } });
  const { data: me } = useMeQuery();
  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = useCallback(() => {
    const message = inputRef.current?.textContent?.trim();
    message && sendMessage({ variables: { chatId: id, text: message } });
    inputRef.current && (inputRef.current.textContent = "");
  }, [id, sendMessage]);

  const submitOnEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (["Enter", "NumpadEnter"].includes(e.code) && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  useEffect(() => {
    inputRef.current && (inputRef.current.textContent = "");
  }, [id]);

  return (
    <footer className="mt-auto flex max-h-[25%] w-full flex-row justify-center p-4">
      {chat &&
        chat.chat &&
        (chat.chat.type !== ChatType.Channel ||
          chat.chat.owner.login === me?.me?.login) && (
          <>
            <div
              className="max-h-full w-3/4 overflow-y-auto overflow-x-hidden rounded border-2 bg-slate-200 p-1 shadow-[0_0_1px_1px] shadow-slate-400 transition-transform duration-300 lg:w-1/2 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:shadow-slate-900"
              contentEditable="plaintext-only"
              onKeyDown={submitOnEnter}
              ref={inputRef}
            />
            <button
              className="ml-3 mt-auto flex h-9 w-9 items-center rounded-full bg-blue-500 p-1 pl-2 shadow-[0_0_1px_2px] shadow-blue-600 transition duration-300 hover:bg-blue-600 active:scale-95 dark:bg-indigo-500 dark:shadow-indigo-600 dark:hover:bg-indigo-600"
              onClick={handleSubmit}
            >
              <PaperPlane className="text-white" />
            </button>
          </>
        )}
    </footer>
  );
});

export default ChatInput;
