import React from "react";
import SidebarContainer from "./components/Sidebars/SidebarContainer/SidebarContainer";
import Main from "./components/Main/Main";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <SidebarContainer />
      <Main />
      <h1 className="dsad font-bold underline text-red-600">test</h1>
    </div>
  );
};

export default App;
