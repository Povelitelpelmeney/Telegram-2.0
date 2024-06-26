import { FormEvent, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useSignInLazyQuery } from "../../graphql";
import { useAppDispatch } from "../../hooks";
import { setToken } from "../../features/token/tokenSlice";
import { LoadingSpin } from "../icons";
import {
  readAllNotifications,
  setActiveChat,
} from "../../features/chat/chatSlice";

type SignInFormDataType = {
  login: string;
  password: string;
};

const initialFormData: SignInFormDataType = {
  login: "",
  password: "",
};

const SignInForm = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const client = useApolloClient();
  const [formData, setFormData] = useState(initialFormData);
  const [signIn, { loading, error }] = useSignInLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      dispatch(setToken(data.signIn!));
      dispatch(setActiveChat(""));
      dispatch(readAllNotifications());
      client.resetStore();
    },
  });

  const setLogin = (login: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, login }));
  };

  const setPassword = (password: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, password }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ variables: formData });
  };

  return (
    <form
      className="overflow-hidden text-ellipsis text-nowrap"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300"
          htmlFor="login"
        >
          Login
        </label>
        <input
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-slate-300"
          id="login"
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          value={formData.login}
          placeholder="Login"
        />
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block select-none text-sm font-bold text-slate-700 dark:text-slate-300"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-slate-300"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={formData.password}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="select-none rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 focus:shadow-[0_0_1px_1px] focus:shadow-slate-600 focus:outline-none active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:shadow-slate-300"
          type="submit"
        >
          Sign in
          {loading && (
            <LoadingSpin className="mb-0.5 ml-1 inline-block h-4 w-4 animate-spin" />
          )}
        </button>
        <p
          className="inline-block cursor-pointer select-none align-baseline text-sm font-semibold text-blue-500 transition hover:text-blue-600 active:scale-95 dark:text-blue-500 dark:hover:text-blue-400"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </p>
      </div>
      {error && (
        <p className="mt-2 inline-block select-none overflow-hidden text-ellipsis text-nowrap align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
          {error.message}
        </p>
      )}
    </form>
  );
});

export default SignInForm;
