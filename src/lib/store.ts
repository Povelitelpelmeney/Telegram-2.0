import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";
import themeReducer from "../features/theme/themeSlice";
import tokenReducer from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    theme: themeReducer,
    token: tokenReducer,
  },
});

const initialState = store.getState();
let currentTheme = initialState.theme;
let currentToken = initialState.token;

store.subscribe(() => {
  const currentState = store.getState();

  if (currentState.theme !== currentTheme) {
    currentTheme = currentState.theme;
    currentTheme
      ? localStorage.setItem("theme", currentTheme)
      : localStorage.removeItem("theme");
  }

  if (currentState.token !== currentToken) {
    currentToken = currentState.token;
    currentToken
      ? localStorage.setItem("token", currentToken)
      : localStorage.removeItem("token");
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
