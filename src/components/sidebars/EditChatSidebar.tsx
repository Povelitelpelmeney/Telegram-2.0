import {
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatType,
  GetAvailableChatsDocument,
  GetAvailableChatsQuery,
  Scalars,
  User,
  useDeleteChatMutation,
  useGetChatInfoQuery,
  useGetUsersLazyQuery,
  useInviteUserMutation,
  useUpdateChatMutation,
} from "../../graphql";
import { Arrow, LoadingSpin, Cross } from "../icons";
import { useSidebarNavigation } from "../../hooks";
import { formatImage } from "../../utils";
import InfiniteScroll from "../InfiniteScroll";

type EditChatSidebarProps = {
  id: string;
};

type UpdateChatFormData = {
  id: string;
  image?: Scalars["Base64"]["input"];
  name?: string;
};

const initialFormData: UpdateChatFormData = { id: "" };

const EditChatSidebar = memo(({ id }: EditChatSidebarProps) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    data: infoData,
    loading: infoLoading,
    error: infoError,
    refetch,
  } = useGetChatInfoQuery({ variables: { id } });
  const [updateChat, { loading: updateLoading, error: updateError }] =
    useUpdateChatMutation();
  const [getUsers] = useGetUsersLazyQuery();
  const [inviteUser] = useInviteUserMutation();
  const [deleteChat, { loading: deleteLoading, error: deleteError }] =
    useDeleteChatMutation();
  const { closeSidebar } = useSidebarNavigation();

  const setImage = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: reader.result?.toString().split(",")[1],
      }));
    };

    reader.readAsDataURL(file);
  };

  const setName = (name: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, name }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChat({
      variables: formData,
      onCompleted: () => refetch(),
    });
  };

  const handleInviteUser = (login: string) => {
    inviteUser({ variables: { chatId: id, login } }).finally(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.login !== login));
    });
  };

  const handleDeleteChat = () => {
    deleteChat({
      variables: { id },
      onCompleted: () => navigate("/"),
      update: (cache) => {
        cache.updateQuery(
          { query: GetAvailableChatsDocument },
          (data: GetAvailableChatsQuery | null) => {
            if (!data) return;
            return {
              ...data,
              chats: data.chats.filter((chat) => chat.id !== id),
            };
          },
        );
      },
    });
  };

  const loadUsers = useCallback(async () => {
    await getUsers({
      variables: { offset, first: 20 },
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        if (!data.users) return;
        if (data.users.length === 0) return;
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        setOffset((prevOffset) => prevOffset + data.users.length);
      },
    });
  }, [getUsers, offset]);

  useEffect(() => {
    if (infoData && infoData.chat)
      setFormData({ id, image: infoData.chat.image, name: infoData.chat.name });
  }, [infoData, id]);

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
          Edit chat
        </p>
      </header>
      {infoLoading && (
        <main className="flex size-full animate-pulse flex-col items-center space-y-6 py-4">
          <div className="size-36 min-h-36 min-w-36 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-4 w-48 rounded bg-slate-300 dark:bg-slate-700" />
        </main>
      )}
      {infoData && infoData.chat && (
        <div className="flex size-full flex-col overflow-y-auto">
          <form
            className="flex w-full flex-col items-center space-y-6 py-2"
            onSubmit={handleSubmit}
          >
            <label className="flex size-36 min-h-36 min-w-36 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400 transition-shadow hover:shadow-[0_0_10px_2px] hover:shadow-slate-600 dark:hover:shadow-slate-400">
              <img
                className="object-cover"
                src={formatImage({
                  base64: formData.image,
                  hash: infoData.chat.id,
                })}
                alt="Profile picture"
              />
              <input
                className="hidden"
                type="file"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                accept="image/*"
              />
            </label>
            <div className="mt-2.5 font-semibold dark:text-white">
              <label
                className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300"
                htmlFor="name"
              >
                New chat name
              </label>
              <input
                className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-slate-300"
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={formData.name || ""}
                placeholder="Chat name"
              />
            </div>
            <button
              className="select-none rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:shadow-slate-300"
              type="submit"
            >
              Save
              {updateLoading && (
                <LoadingSpin className="mb-0.5 ml-1 inline-block h-4 w-4 animate-spin" />
              )}
            </button>
            {updateError && (
              <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
                {updateError.message}
              </p>
            )}
          </form>
          {infoData.chat.type !== ChatType.Private && (
            <div className="flex size-full flex-col items-center space-y-2 py-2">
              <p className="block select-none text-sm font-bold text-slate-700 dark:text-slate-300">
                Invite users
              </p>
              <div className="flex size-60 flex-col overflow-y-auto overflow-x-hidden rounded border-2">
                {users
                  .filter((user) => user.login !== infoData.chat?.owner.login)
                  .map((user) => (
                    <div
                      className="relative flex h-12 w-full flex-row space-x-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
                      key={user.login}
                    >
                      <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
                        <img
                          className="object-fill"
                          src={formatImage({
                            base64: user.image,
                            hash: user.login,
                          })}
                          alt="Profile picture"
                        />
                      </span>
                      <p className="overflow-hidden text-ellipsis text-nowrap text-lg font-semibold dark:text-white">
                        {user.name}
                      </p>
                      <div
                        className="absolute right-0 flex size-9 cursor-pointer items-center justify-center rounded-full transition-transform hover:bg-slate-300 active:scale-95 dark:hover:bg-slate-700"
                        onClick={() => handleInviteUser(user.login)}
                      >
                        <Cross className="size-8 rotate-45 p-1 text-green-600 dark:text-green-500" />
                      </div>
                    </div>
                  ))}
                <InfiniteScroll loadMore={loadUsers} />
              </div>
            </div>
          )}
          <button
            className="mt-auto select-none rounded bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none active:scale-95 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:shadow-slate-300"
            type="button"
            onClick={() => handleDeleteChat()}
          >
            Delete chat
            {deleteLoading && (
              <LoadingSpin className="mb-0.5 ml-1 inline-block h-4 w-4 animate-spin" />
            )}
          </button>
          {deleteError && (
            <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
              {deleteError.message}
            </p>
          )}
        </div>
      )}
      {infoError && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <div className="h-4 text-2xl font-semibold text-red-700 dark:text-red-500">
            Can't load chat info
          </div>
        </main>
      )}
    </div>
  );
});

export default EditChatSidebar;
