import { memo } from "react";
import { Link } from "react-router-dom";
import { Scalars, useGetChatInfoQuery } from "../../graphql";
import { formatImage } from "../../utils";
import { useMediaQuery } from "../../hooks";
import { Arrow } from "../icons";

type ChatHeaderProps = {
  id: Scalars["ID"]["output"];
};

const ChatHeader = memo(({ id }: ChatHeaderProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { data, loading, error } = useGetChatInfoQuery({ variables: { id } });

  return (
    <header className="flex h-16 w-full flex-row items-center justify-center border-2 bg-slate-100 dark:border-black dark:bg-slate-900">
      {loading && (
        <div className="flex h-full w-full animate-pulse flex-row space-x-4 px-4 py-1.5">
          <div className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-2 w-36 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      )}
      {error && (
        <div className="flex h-16 w-full space-x-4 border-2 bg-slate-100 px-5 py-1.5 dark:border-black dark:bg-slate-900">
          <p className="mt-1 text-xl font-semibold text-red-700 dark:text-red-500">
            {error.message}
          </p>
        </div>
      )}
      {data && data.chat && (
        <>
          {!isLargeScreen && (
            <Link
              className="flex h-12 w-12 select-none items-center justify-center pl-2"
              to="/"
            >
              <Arrow className="h-10 w-10 rotate-180 text-slate-500 dark:text-slate-400" />
            </Link>
          )}
          <Link
            className="flex h-full w-full flex-row space-x-4 px-4 py-1.5"
            to={`/${id}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
              <img
                className="h-9 w-9"
                src={formatImage({ base64: data.chat.image, hash: id })}
                alt="Image"
              />
            </span>
            <p className="inline text-lg font-semibold dark:text-white">
              {data.chat.name}
            </p>
          </Link>
        </>
      )}
    </header>
  );
});

export default ChatHeader;
