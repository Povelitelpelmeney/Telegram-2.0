import { memo, useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../graphql";
import { Arrow, Pen } from "../icons";
import { useSidebarNavigation } from "../../hooks";
import { formatImage } from "../../utils";
import { SidebarType } from "../../contexts/SidebarContext";

const SettingsSidebar = memo(() => {
  const [closing, setClosing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useMeQuery();
  const { openSidebar, closeSidebar } = useSidebarNavigation();

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
          Settings
        </p>
        <div
          className="ml-auto flex size-12 cursor-pointer items-center justify-center rounded-full transition hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={() => openSidebar({ type: SidebarType.EDIT_PROFILE })}
        >
          <Pen className="size-9 dark:text-white" />
        </div>
      </header>
      {loading && (
        <main className="flex size-full animate-pulse flex-col items-center space-y-6 py-4">
          <div className="size-36 min-h-36 min-w-36 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="mt-2.5 h-4 w-48 rounded bg-slate-300 dark:bg-slate-700" />
        </main>
      )}
      {data && data.me && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <span className="flex size-36 min-h-36 min-w-36 select-none items-center justify-center overflow-hidden rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
            <img
              className="object-cover"
              src={formatImage({
                base64: data.me.image,
                hash: data.me.login,
              })}
              alt="Profile picture"
            />
          </span>
          <div className="mt-2.5 h-4 text-2xl font-semibold dark:text-white">
            {data.me.name}
          </div>
        </main>
      )}
      {error && (
        <main className="flex size-full flex-col items-center space-y-6 py-4">
          <div className="h-4 text-2xl font-semibold text-red-600 dark:text-red-500">
            Can't load profile info
          </div>
        </main>
      )}
    </div>
  );
});

export default SettingsSidebar;
