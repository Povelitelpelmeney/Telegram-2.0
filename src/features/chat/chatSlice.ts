import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatsState = {
  active: string;
  muted: string[];
  notified: string[];
};

const initialState: ChatsState = {
  active: "",
  muted: [],
  notified: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string>) {
      state.active = action.payload;
    },
    setMutedChats(state, action: PayloadAction<string[]>) {
      state.muted = action.payload;
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
  setMutedChats,
  notifyChat,
  readNotification,
  readAllNotifications,
} = chatsSlice.actions;
export default chatsSlice.reducer;
