import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { SignInForm, SignUpForm } from "../components/auth-forms";

type AuthProps = {
  type: "signin" | "signup";
};

const Auth = memo(({ type }: AuthProps) => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center bg-slate-100 lg:bg-slate-200 dark:bg-slate-900 lg:dark:bg-slate-800">
      <main className="mt-auto h-fit w-fit rounded-xl bg-slate-100 p-8 dark:bg-slate-900">
        {type === "signin" ? <SignInForm /> : <SignUpForm />}
      </main>
      <footer className="mb-2 mt-auto">
        <p className="select-none text-center text-xs text-slate-500 dark:text-slate-400">
          &copy;2024 Kilogram. All rights reserved.
        </p>
      </footer>
    </div>
  );
});

export default Auth;
