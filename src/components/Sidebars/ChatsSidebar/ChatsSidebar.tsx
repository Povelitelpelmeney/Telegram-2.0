import "./ChatsSidebar.scss";

type ChatsSidebarProps = {
  onOpen: (sidebarName: string) => void;
  active: boolean;
};

const ChatsSidebar = (props: ChatsSidebarProps) => {
  return (
    <div className={`sidebar chats ${props.active ? "active" : ""}`}>
      <h1>Chats</h1>
      <button onClick={() => props.onOpen("login")}>Login</button>
      <div contentEditable={true}></div>
    </div>
  );
};

export default ChatsSidebar;
