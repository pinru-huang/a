import React from "react";
import Info from "../components/Info";
import Restaurants from "../components/Block";
import UserStatusButton from "../components/UserButton";
import Background from "../components/Background";
import { useApp } from "../hook";
import homepage from "./css/homepage.css"
const Menu = (props) => {
    const {status,setStatus}=useApp();

    return React.createElement(
        "div",
        { id: "app", className:"logged-in" },
        React.createElement(
      "div",
      { id: "app-menu" },
      React.createElement(
        "div",
        { id: "app-menu-content-wrapper" },
        React.createElement(
          "div",
          { id: "app-menu-content" },
          React.createElement(
            "div",
            { id: "app-menu-content-header" },
            React.createElement(
              "div",
              { className: "app-menu-content-header-section" },
              React.createElement(Info, { id: "app-menu-info" }),
            ),
            React.createElement(
              "div",
              { className: "app-menu-content-header-section" },
              React.createElement(UserStatusButton, {
                icon: "fa-solid fa-arrow-up-right-from-square",
                id: "sign-out-button",
                userStatus: "LoggedOut",
                val:props.val
              })
            )
          ),
          React.createElement(Restaurants, null)
        )
      )),
      React.createElement(Background, null),
    );
  };
  export default Menu;