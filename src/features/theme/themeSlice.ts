import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = string;

const initialState: ThemeState = localStorage.getItem("theme") || "";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
