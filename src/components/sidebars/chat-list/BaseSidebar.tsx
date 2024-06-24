import React, { useState } from "react";
import { formatImage } from "../../../utils";
import chat from "./ChatInfoSidebar";
import { ChatQuery, MeQuery, UserQuery } from "../../../graphql/index";
type SidebarChatProps = {
  isOpen: boolean;
  setOpen: () => void;
  chat: ChatQuery | undefined;
  onEditAvatar?: () => void;
  onEditChannelName?: () => void;
  onDeleteChannel?: () => void;
};
type SidebarUserProps = {
  isOpen: boolean;
  setOpen: (param: string | undefined) => void;
  data: UserQuery | undefined;
};
type SidebarPersonalProps = {
  isOpen: boolean;
  setOpen: () => void;
  me: MeQuery | undefined;
  onEditAvatar: () => void;
  onEditChannelName: () => void;
  onLogout: () => void;
};
type Props = SidebarChatProps | SidebarUserProps | SidebarPersonalProps;

const Sidebar = (myProps: Props) => {
  if ("chat" in myProps) {
    const {
      isOpen,
      setOpen,
      chat,
      onEditAvatar,
      onEditChannelName,
      onDeleteChannel,
    } = myProps;
    return (
      <div
        className={`fixed right-0 top-0 h-full w-1/4 bg-slate-100 text-black shadow-lg  transition-transform duration-300 dark:bg-slate-900 dark:text-white ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Channel Info</h2>
            <button
              onClick={setOpen}
              className="text-2xl text-black dark:text-white"
            >
              &times;
            </button>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
              <img
                className="h-20 w-20"
                src={formatImage({
                  base64: chat?.chat?.image,
                  hash: chat?.chat?.id,
                })}
                alt="Image"
              />
            </span>
            <h3 className="text-xl font-semibold">{chat?.chat?.name}</h3>
          </div>
          <p className="mb-4 text-center font-semibold">{chat?.chat?.type}</p>
          <div className="mb-4 flex flex-col space-y-2">
            <button
              onClick={onEditAvatar}
              className={`${onEditAvatar == undefined ? "hidden" : ""} rounded bg-blue-500 px-4 py-2 text-white`}
            >
              Edit Avatar
            </button>
            <button
              onClick={onEditChannelName}
              className={`${onEditChannelName == undefined ? "hidden" : ""} rounded bg-blue-500 px-4 py-2 text-white`}
            >
              Edit Channel Name
            </button>
            <button
              onClick={onDeleteChannel}
              className={`${onDeleteChannel == undefined ? "hidden" : ""} rounded bg-red-500 px-4 py-2 text-white`}
            >
              Delete Channel
            </button>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span>Notifications</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
        </div>
      </div>
    );
  }
  if ("data" in myProps) {
    const { isOpen, setOpen, data } = myProps;
    return (
      <div
        className={`fixed right-0 top-0 h-full w-1/4 bg-slate-100 text-black shadow-lg  transition duration-300 dark:bg-slate-900 dark:text-white ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Info</h2>
            <button
              onClick={() => setOpen(data?.user?.login)}
              className="text-2xl text-black dark:text-white"
            >
              &times;
            </button>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <span className="flex size-28 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
              <img
                className="size-20 object-cover"
                src={formatImage({
                  base64: data?.user?.image,
                  hash: data?.user?.login,
                })}
                alt="Image"
              />
            </span>
            <h3 className="text-xl font-semibold">{data?.user?.name}</h3>
          </div>
        </div>
      </div>
    );
  }
  if ("me" in myProps) {
    const { isOpen, setOpen, me, onEditAvatar, onEditChannelName, onLogout } =
      myProps;
    return (
      <div
        className={`fixed right-full top-0 h-full w-1/4 bg-slate-100 text-black shadow-lg transition-transform duration-300 dark:bg-slate-900 dark:text-white ${isOpen ? "translate-x-full" : "translate-x-0"}`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Info</h2>
            <button
              onClick={setOpen}
              className="text-2xl text-black dark:text-white"
            >
              &times;
            </button>
          </div>
          <div className="mb-4 flex flex-col items-center">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200 shadow-[0_0_1px_2px] shadow-slate-400">
              <img
                className="h-20 w-20"
                src={formatImage({
                  base64: me?.me?.image,
                  hash: me?.me?.login,
                })}
                alt="Image"
              />
            </span>
            <h3 className="text-xl font-semibold">{me?.me?.name}</h3>
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <input
              type="file"
              id="label-choose"
              accept="image/*"
              onChange={onEditAvatar}
              className="hidden rounded bg-blue-500 px-4 py-2 text-white"
            />
            <button
              onClick={onEditAvatar}
              type="button"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              <label htmlFor="label-choose">Edit avatar</label>
            </button>
            <button
              onClick={onEditChannelName}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Edit Channel Name
            </button>
            <button
              onClick={onLogout}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Sidebar;
