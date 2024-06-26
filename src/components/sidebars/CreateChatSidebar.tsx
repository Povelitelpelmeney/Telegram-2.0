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
  User,
  useCreateChatMutation,
  useGetUsersLazyQuery,
  useMeQuery,
} from "../../graphql";
import { useSidebarNavigation } from "../../hooks";
import { Arrow, LoadingSpin } from "../icons";
import { formatImage } from "../../utils";
import InfiniteScroll from "../InfiniteScroll";

type CreateChatSidebarProps = {
  type: ChatType;
};

type CreateChatFormData = {
  type: ChatType;
  name: string;
  members: string[];
};

const initialFormData: CreateChatFormData = {
  type: ChatType.Private,
  name: "",
  members: [],
};

const CreateChatSidebar = memo(({ type }: CreateChatSidebarProps) => {
  const navigate = useNavigate();
  const { data } = useMeQuery();
  const [getUsers] = useGetUsersLazyQuery();
  const [createChat, { loading, error }] = useCreateChatMutation();
  const [users, setUsers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState({ ...initialFormData, type });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { closeSidebar } = useSidebarNavigation();

  const setName = (name: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, name }));
  };

  const setMembers = (login: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      members:
        type === ChatType.Private
          ? [login]
          : prevFormData.members.includes(login)
            ? prevFormData.members.filter((member) => member != login)
            : [...prevFormData.members, login],
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data?.me) return;
    createChat({
      variables: {
        ...formData,
        members: [...formData.members, data.me.login],
      },
      onCompleted: (data) => {
        setClosing(true);
        navigate(`/${data.createChat.id}`);
      },
    });
  };

  const loadUsers = useCallback(async () => {
    await getUsers({
      variables: { offset, first: 20 },
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        if (data.users.length === 0) return;
        setUsers((prevUsers) => [...prevUsers, ...data.users]);
        setOffset((prevOffset) => prevOffset + data.users.length);
      },
    });
  }, [getUsers, offset]);

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
      className={`col-[1] row-[1] flex h-full w-0 min-w-full flex-col border-2 bg-slate-100 p-1 pt-0 dark:border-black dark:bg-slate-900 ${closing ? "ml-[-100%] animate-slide-in-left" : "animate-slide-in-right"}`}
      ref={sidebarRef}
    >
      <header className="h-15 flex w-full flex-row items-center border-b-2 border-b-black bg-slate-100 px-2 dark:border-b-white dark:bg-slate-900">
        <div
          className="flex size-12 rotate-180 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={() => setClosing(true)}
        >
          <Arrow className="size-9 dark:text-white" />
        </div>
        <p className="mb-1 ml-2 text-2xl font-semibold dark:text-white">
          {`Create ${type === ChatType.Private ? "private chat" : type === ChatType.Group ? "group chat" : "channel"}`}
        </p>
      </header>
      <main className="flex size-full flex-col space-y-6 p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300"
              htmlFor="name"
            >
              Chat name
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
          <div className="mb-6 flex flex-col">
            <p className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300">
              Select members
            </p>
            <div className="flex h-60 max-w-full flex-col overflow-y-auto rounded border-2">
              {users
                .filter((user) => user.login !== data?.me?.login)
                .map((user) => (
                  <div
                    className={`inline-flex h-12 max-w-full cursor-pointer space-x-2 p-1 ${formData.members.includes(user.login) ? "bg-blue-600 dark:bg-indigo-600" : "hover:bg-slate-200 dark:hover:bg-slate-800"}`}
                    key={user.login}
                    onClick={() => setMembers(user.login)}
                  >
                    <span className="flex size-10 min-h-10 min-w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
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
                  </div>
                ))}
              <InfiniteScroll loadMore={loadUsers} />
            </div>
          </div>
          <button
            className="select-none rounded bg-blue-500 px-4 py-2 font-semibold text-white transition enabled:hover:bg-blue-600 enabled:focus:shadow-[0_0_1px_1px] enabled:focus:shadow-slate-600 enabled:focus:outline-none enabled:active:scale-95 disabled:bg-slate-400 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-500 enabled:dark:focus:shadow-slate-300"
            type="submit"
            disabled={
              type === ChatType.Private
                ? formData.members.length < 1
                : formData.members.length < 2
            }
          >
            Create chat
            {loading && (
              <LoadingSpin className="mb-0.5 ml-1 inline-block h-4 w-4 animate-spin" />
            )}
          </button>
          {error && (
            <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
              {error.message}
            </p>
          )}
        </form>
      </main>
    </div>
  );
});

export default CreateChatSidebar;
