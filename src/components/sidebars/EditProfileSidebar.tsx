import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { Scalars, useMeQuery, useUpdateUserMutation } from "../../graphql";
import { Arrow, LoadingSpin } from "../icons";
import { useSidebarNavigation } from "../../hooks";
import { formatImage } from "../../utils";

type UpdateUserFormData = {
  image?: Scalars["Base64"]["input"];
  name?: string;
};

const initialFormData: UpdateUserFormData = {};

const EditProfileSidebar = memo(() => {
  const [closing, setClosing] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    data: infoData,
    loading: infoLoading,
    error: infoError,
    refetch,
  } = useMeQuery();
  const [updateUser, { loading: updateLoading, error: updateError }] =
    useUpdateUserMutation();
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

  const setUsername = (name: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, name }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({
      variables: formData,
      onCompleted: () => refetch(),
    });
  };

  useEffect(() => {
    if (infoData && infoData.me)
      setFormData({ image: infoData.me.image, name: infoData.me.name });
  }, [infoData]);

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
          Edit profile
        </p>
      </header>
      {infoLoading && (
        <main className="flex size-full animate-pulse flex-col items-center space-y-6 py-4">
          <div className="size-36 min-h-36 min-w-36 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-4 w-48 rounded bg-slate-300 dark:bg-slate-700" />
        </main>
      )}
      {infoData && infoData.me && (
        <form
          className="flex size-full flex-col items-center space-y-6 py-4"
          onSubmit={handleSubmit}
        >
          <label className="flex size-36 min-h-36 min-w-36 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400 transition-shadow hover:shadow-[0_0_10px_2px] hover:shadow-slate-600 dark:hover:shadow-slate-400">
            <img
              className="object-cover"
              src={formatImage({
                base64: formData.image,
                hash: infoData.me.login,
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
              htmlFor="username"
            >
              New username
            </label>
            <input
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-slate-300"
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={formData.name || ""}
              placeholder="Username"
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
      )}
      {infoError && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <div className="h-4 text-2xl font-semibold text-red-700 dark:text-red-500">
            Can't load profile info
          </div>
        </main>
      )}
    </div>
  );
});

export default EditProfileSidebar;
