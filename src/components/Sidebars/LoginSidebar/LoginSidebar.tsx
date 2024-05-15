type LoginSidebarProps = {
  onClose: () => void;
  active: boolean;
};

const LoginSidebar = (props: LoginSidebarProps) => {
  return (
    <div className="font-bold underline">
      <h1>Login</h1>
      <button onClick={props.onClose}>Back</button>
      <div contentEditable={true}></div>
    </div>
  );
};

export default LoginSidebar;
