import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatsState = {
  active: string;
  muted: string[];
  notified: string[];
};

const mutedChats = localStorage.getItem("muted");

const initialState: ChatsState = {
  active: "",
  muted: mutedChats ? JSON.parse(mutedChats) : [],
  notified: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
    muteChat(state, action: PayloadAction<string>) {
      state.muted.includes(action.payload)
        ? (state.muted = state.muted.filter((chat) => chat !== action.payload))
        : (state.muted = [...state.muted, action.payload]);
    },
    notifyChat(state, action: PayloadAction<string>) {
      if (!state.notified.includes(action.payload))
        state.notified = [...state.notified, action.payload];
    },
    readNotification(state, action: PayloadAction<string>) {
      state.notified = state.notified.filter((chat) => chat !== action.payload);
    },
    readAllNotifications(state) {
      state.notified = [];
    },
  },
});

export const {
  setActiveChat,
  muteChat,
  notifyChat,
  readNotification,
  readAllNotifications,
} = chatsSlice.actions;
export default chatsSlice.reducer;
