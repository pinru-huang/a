import React from "react";
import ScrollableComponent from "./ScrollableComponent";
const MenuSection = (props) => {
    const getContent = () => {
      if (props.scrollable) {
        return React.createElement(
          ScrollableComponent,
          { className: "menu-section-content" },
          props.children
        );
      }
      return React.createElement(
        "div",
        { className: "menu-section-content" },
        props.children
      );
    };
    return React.createElement(
      "div",
      { id: props.id, className: "menu-section" },
      React.createElement(
        "div",
        { className: "menu-section-title" },
        React.createElement("i", { className: props.icon }),
        React.createElement(
          "span",
          { className: "menu-section-title-text" },
          props.title
        )
      ),
      getContent()
    );
  };
  export default MenuSection;