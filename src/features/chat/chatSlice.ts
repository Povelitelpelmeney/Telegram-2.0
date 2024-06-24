import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatState = string;

const initialState: ChatState = "";

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
