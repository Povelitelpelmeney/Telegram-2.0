import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpin } from "../icons";
import { useSignInLazyQuery } from "../../graphql";
import { AuthContext } from "../../contexts";

type SignInFormDataType = {
  login: string;
  password: string;
};

const initialFormData: SignInFormDataType = {
  login: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const setAuthType = useContext(AuthContext);
  const [formData, setFormData] = useState(initialFormData);
  const [signIn, { loading, error }] = useSignInLazyQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn!);
      navigate("/");
    },
  });

  const setLogin = (login: string) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, login: login };
    });
  };

  const setPassword = (password: string) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, password: password };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ variables: formData });
  };

  return (
    <form
      className="absolute left-0 top-0 mb-4 flex h-full w-full flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md lg:left-auto lg:top-auto lg:block lg:h-auto lg:w-auto dark:bg-slate-900"
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
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_0_1px_rgba(0,_0,_0,_.25)] focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-[0_0_0_2px_rgba(255,_255,_255,_.1)]"
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
          className="w-full appearance-none rounded border px-3 py-2 leading-tight text-slate-700 shadow transition-shadow focus:shadow-[0_0_0_2px_rgba(0,_0,_0,_.25)] focus:outline-none dark:bg-slate-800 dark:text-slate-50 dark:focus:shadow-[0_0_0_2px_rgba(255,_255,_255,_.25)]"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={formData.password}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="select-none rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600 focus:shadow-[0_0_0_1px_rgba(0,_0,_0,_.25)] focus:outline-none active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:shadow-[0_0_0_1px_rgba(255,_255,_255,_.75)]"
          type="submit"
        >
          Sign In
          {loading && (
            <LoadingSpin className="mb-0.5 ml-1 inline-block animate-spin" />
          )}
        </button>
        <p
          className="inline-block cursor-pointer select-none align-baseline text-sm font-semibold text-blue-500 transition hover:text-blue-600 active:scale-95 dark:text-blue-500 dark:hover:text-blue-400"
          onClick={() => setAuthType && setAuthType("signUp")}
        >
          Sign up
        </p>
      </div>
      {error && (
        <p className="mt-2 inline-block select-none align-baseline text-sm font-semibold text-red-700 dark:text-red-500">
          {error.message.charAt(0).toUpperCase() + error.message.slice(1)}
        </p>
      )}
      <p className="mt-auto select-none pt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        &copy;2024 Kilogram. All rights reserved.
      </p>
    </form>
  );
};

export default SignInForm;
