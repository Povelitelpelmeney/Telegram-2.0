import {
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ChatType,
  User,
  useGetChatInfoQuery,
  useGetChatMembersLazyQuery,
  useKickUserMutation,
  useMeQuery,
  useUpsertUserMetaMutation,
} from "../../graphql";
import { useAppSelector, useSidebarNavigation } from "../../hooks";
import { Arrow, Pen, Cross } from "../icons";
import { formatImage } from "../../utils";
import { SidebarType } from "../../contexts/SidebarContext";
import InfiniteScroll from "../InfiniteScroll";

type ChatInfoSidebarProps = {
  id: string;
};

const ChatInfoSidebar = memo(({ id }: ChatInfoSidebarProps) => {
  const [closing, setClosing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mutedChats = useAppSelector((state) => state.chats.muted);
  const { data: meData } = useMeQuery();
  const [upsertUserMeta] = useUpsertUserMetaMutation();
  const [kickUser] = useKickUserMutation();
  const [getMembers] = useGetChatMembersLazyQuery();
  const { data, loading, error } = useGetChatInfoQuery({
    variables: { id },
  });
  const [members, setMembers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);
  const { openSidebar, closeSidebar } = useSidebarNavigation();

  const handleKickUser = (e: MouseEvent<HTMLDivElement>, login: string) => {
    e.stopPropagation();
    kickUser({
      variables: { chatId: id, login },
      onCompleted: () => {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.login !== login),
        );
        setOffset((prevOffset) => --prevOffset);
      },
    });
  };

  const handleMuteChat = () => {
    const mutedChats: string[] = JSON.parse(
      meData?.me?.meta.find((item) => item.key === "muted")?.val || "[]",
    );

    const modifiedMutedChats = mutedChats.includes(id)
      ? mutedChats.filter((chatId) => chatId !== id)
      : [...mutedChats, id];
    upsertUserMeta({
      variables: { key: "muted", val: JSON.stringify(modifiedMutedChats) },
      fetchPolicy: "network-only",
    });
  };

  const loadMembers = useCallback(async () => {
    await getMembers({
      variables: { id, offset, first: 20 },
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        if (!data.chat?.members) return;
        if (data.chat.members.length === 0) return;
        setMembers((prevMembers) => [...prevMembers, ...data.chat!.members]);
        setOffset((prevOffset) => prevOffset + data.chat!.members.length);
      },
    });
  }, [getMembers, id, offset]);

  useEffect(() => {
    const handleClose = () => {
      if (closing) closeSidebar();
    };

    const node = sidebarRef.current;
    if (node) {
      node.addEventListener("animationend", handleClose);
      return () => node.removeEventListener("animationend", handleClose);
    }
  }, [closing, closeSidebar]);

  return (
    <div
      className={`fixed right-0 flex size-full flex-col border-2 bg-slate-100 p-1 pt-0 lg:w-1/4 dark:border-black dark:bg-slate-900 ${closing ? "left-full animate-slide-in-right" : "animate-slide-in-left"}`}
      ref={sidebarRef}
    >
      <header className="h-15 flex w-full flex-row items-center border-b-2 border-b-black bg-slate-100 px-2 dark:border-b-white dark:bg-slate-900">
        <div
          className="flex size-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={() => setClosing(true)}
        >
          <Arrow className="size-9 dark:text-white" />
        </div>
        <p className="mb-1 ml-2 text-2xl font-semibold dark:text-white">
          Chat info
        </p>
        {meData?.me?.login === data?.chat?.owner.login && (
          <div
            className="ml-auto flex size-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800"
            onClick={() => openSidebar({ type: SidebarType.EDIT_CHAT, id })}
          >
            <Pen className="size-9 dark:text-white" />
          </div>
        )}
      </header>
      {loading && (
        <main className="flex size-full animate-pulse flex-col items-center space-y-6 py-4">
          <div className="size-36 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-4 w-48 rounded bg-slate-300 dark:bg-slate-700" />
        </main>
      )}
      {data && data.chat && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <span className="flex size-36 min-h-36 min-w-36 select-none items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
            <img
              className="object-cover"
              src={formatImage({
                base64: data.chat.image,
                hash: data.chat.id,
              })}
              alt="Profile picture"
            />
          </span>
          <div className="mb-4 mt-2.5 h-4 text-2xl font-semibold dark:text-white">
            {data.chat.name}
          </div>
          {id !== "spam" && (
            <div className="flex flex-col">
              <p className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300">
                Members
              </p>
              <div className="flex size-60 flex-col overflow-y-auto rounded border-2">
                {members.map((member) => (
                  <div
                    className="relative flex h-12 w-full cursor-pointer flex-row space-x-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
                    key={member.login}
                    onClick={() =>
                      openSidebar({
                        type: SidebarType.USER_INFO,
                        id: member.login,
                      })
                    }
                  >
                    <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
                      <img
                        className="object-fill"
                        src={formatImage({
                          base64: member.image,
                          hash: member.login,
                        })}
                        alt="Profile picture"
                      />
                    </span>
                    <p className="overflow-hidden text-ellipsis text-nowrap text-lg font-semibold dark:text-white">
                      {member.name}
                    </p>
                    {meData?.me?.login === data.chat?.owner.login &&
                      member.login !== data.chat?.owner.login &&
                      data.chat?.type !== ChatType.Private &&
                      members.length > 3 && (
                        <div
                          className="absolute right-0 flex size-9 cursor-pointer items-center justify-center rounded-full transition-transform hover:bg-slate-300 active:scale-95 dark:hover:bg-slate-700"
                          onClick={(e) => handleKickUser(e, member.login)}
                        >
                          <Cross className="size-8 p-1 text-red-600 dark:text-red-500" />
                        </div>
                      )}
                  </div>
                ))}
                <InfiniteScroll loadMore={loadMembers} />
              </div>
            </div>
          )}
          <label className="mt-auto inline-flex cursor-pointer justify-center space-x-2 p-2">
            <p className="dark:text-white">Notifications</p>
            <input
              className="peer sr-only"
              type="checkbox"
              defaultChecked={!mutedChats.includes(id)}
              onChange={handleMuteChat}
              value=""
            />
            <div className="peer relative h-6 w-11 rounded-full bg-slate-400 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-slate-500" />
          </label>
        </main>
      )}
      {error && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <div className="h-4 text-2xl font-semibold text-red-600 dark:text-red-500">
            Can't load chat info
          </div>
        </main>
      )}
    </div>
  );
});

export default ChatInfoSidebar;
