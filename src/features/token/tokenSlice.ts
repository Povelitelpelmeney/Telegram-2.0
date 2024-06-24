import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TokenState = string;

const initialState: TokenState = localStorage.getItem("token") || "";

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(_, action: PayloadAction<string>) {
      return action.payload;
    },
    removeToken() {
      return "";
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
