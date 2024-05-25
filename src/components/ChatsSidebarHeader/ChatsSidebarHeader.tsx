import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../hooks/useColorScheme";
import "./ChatsSidebarHeader.scss";
import useColorScheme from "../../hooks/useColorScheme";
import ContextMenu from "../ContextMenu/ContextMenu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const triggerRef = useRef(null);
  const togglePopup = () => {
    setOpen(!open);
    if (colorScheme === "light") {
      handleCheck();
    }
  };
  const handleCheck = () => {
    setCheck(!check);
  };
  const changeScheme = () => {
    toggleColorScheme();
    handleCheck();
  };
  return (
    <div className="header dark:bg-gray-800">
      {open ? (
        <div className="popup_button rotate">
          <button onClick={togglePopup} ref={triggerRef}>
            <i className="bi bi-list text-color"></i>
          </button>
        </div>
      ) : (
        <div className="popup_button rotate_back">
          <button onClick={togglePopup} ref={triggerRef}>
            <i className="bi bi-list text-color"></i>
          </button>
        </div>
      )}
      <ContextMenu
        isOpen={open}
        setOpen={togglePopup}
        className="menu_popup"
        triggerRef={triggerRef}
      >
        <ul className="dropdown_content rounded-r-lg dark:rounded-r-lg  dark:bg-gray-800">
          <li>
            <div className="settings">
              <div className="li_item hover-text">
                <p className="text-color">Settings</p>
              </div>
            </div>
          </li>
          <li>
            <div className="theme_switch" onClick={changeScheme}>
              <div className="li_item hover-text">
                <p className="text-color">Dark mode</p>
              </div>
              <div className="toggle_switch">
                <label>
                  <input
                    id="toggle_input"
                    type="checkbox"
                    onChange={changeScheme}
                    checked={check}
                    disabled
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </li>
          <li>
            <div className="somth">
              <div className="li_item hover-text">
                <p className="text-color">smth</p>
              </div>
            </div>
          </li>
          <li>
            <div className="somth">
              <div className="li_item hover-text">
                <p className="text-color">smth</p>
              </div>
            </div>
          </li>
        </ul>
      </ContextMenu>
    </div>
  );
};

export default Header;
