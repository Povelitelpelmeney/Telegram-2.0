import React, { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setOpen: () => void;
  avatar: string;
  channelName: string;
  subscribers?: string[];
  description?: string;
  onEditAvatar: () => void;
  onEditChannelName: () => void;
  onDeleteChannel: () => void;
}
// interface SidebarPersonalProps {
//   isOpen: boolean;
//   setOpen: (open: boolean) => void;
//   avatar: string;
//   name: string;
// }
// type Props = SidebarProps | SidebarPersonalProps;
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setOpen,
  avatar,
  channelName,
  subscribers,
  description,
  onEditAvatar,
  onEditChannelName,
  onDeleteChannel,
}) => {
  return (
    <div
      className={`bg-aliceblue fixed right-0 top-0 h-full text-black shadow-lg transition-transform  duration-300 dark:bg-gray-800 dark:text-white ${isOpen ? "translate-x-0" : "translate-x-full"}`}
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
          <img
            src={avatar}
            alt="Profile"
            className="mb-2 rounded-full border-4 border-green-500"
          />
          <h3 className="text-xl font-semibold">{channelName}</h3>
          <span className="text-sm text-gray-400">
            {subscribers} subscribers
          </span>
        </div>
        <p className="mb-4 text-center">{description}</p>
        <div className="mb-4 flex flex-col space-y-2">
          <button
            onClick={onEditAvatar}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Edit Avatar
          </button>
          <button
            onClick={onEditChannelName}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Edit Channel Name
          </button>
          <button
            onClick={onDeleteChannel}
            className="rounded bg-red-500 px-4 py-2 text-white"
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
};

export default Sidebar;
