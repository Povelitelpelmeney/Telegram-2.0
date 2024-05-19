import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../hooks/useColorScheme";
import "./Header.scss";
import useColorScheme from "../../hooks/useColorScheme";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const toggle = document.getElementById("toggle_input");
  console.log(colorScheme);
  const togglePopup = () => {
    setOpen(!open);
  };
  const changeScheme = () => {
    toggleColorScheme();
    colorScheme === "light" ? toggle?.setAttribute("checked", "true") : "";
    colorScheme === "dark" ? toggle?.removeAttribute("checked") : "";
  };
  return (
    <div className="header dark:bg-gray-800">
      {open ? (
        <div className="popup_button rotate">
          <button onClick={togglePopup}>
            <i className="bi bi-list dark:text-slate-100"></i>
          </button>
        </div>
      ) : (
        <div className="popup_button rotate_back">
          <button onClick={togglePopup}>
            <i className="bi bi-list"></i>
          </button>
        </div>
      )}
      {open && (
        <div className="menu_popup rounded-xl">
          <ul className="dropdown_content dark:bg-gray-800">
            <li>
              <div className="settings">
                <div className="li_item dark:hover:bg-violet-500">
                  <p className="dark:text-slate-100">Settings</p>
                </div>
              </div>
            </li>
            <li>
              <div className="theme_switch" onClick={changeScheme}>
                <div className="li_item dark:hover:bg-violet-500">
                  <p className="dark:text-slate-100">Dark mode</p>
                </div>
                <div className="toggle_switch">
                  <label>
                    <input
                      id="toggle_input"
                      type="checkbox"
                      onChange={changeScheme}
                      disabled
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div></div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
