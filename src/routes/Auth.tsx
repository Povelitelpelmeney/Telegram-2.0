import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts";
import { SignInForm, SignUpForm } from "../components/auth-forms";

const Auth = () => {
  const [authType, setAuthType] = useState<"signIn" | "signUp">("signIn");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <AuthContext.Provider value={setAuthType}>
        {authType === "signIn" ? <SignInForm /> : <SignUpForm />}
      </AuthContext.Provider>
    </div>
  );
};

export default Auth;
