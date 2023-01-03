import React from "react";
import L from "../containers/css/loading.module.css"
const Loading = (props) => {
    return React.createElement(
      "div",
      { id: "app-loading-icon", className:(L["app-loading-icon"]+(props.loading?(" "+L["verifying-log-in"]):""))},
      React.createElement("i", { className: "fa-solid fa-spinner" }),
        // <div className={L.divider} aria-hidden="true"></div>,
        // <p className={L["loading-text"]} aria-label="Loading">
        //     <span className={L.letter} aria-hidden="true">L</span>
        //     <span className={L.letter} aria-hidden="true">o</span>
        //     <span className={L.letter} aria-hidden="true">a</span>
        //     <span className={L.letter} aria-hidden="true">d</span>
        //     <span className={L.letter} aria-hidden="true">i</span>
        //     <span className={L.letter} aria-hidden="true">n</span>
        //     <span className={L.letter} aria-hidden="true">g</span>
        // </p>
    );
  };
export default Loading;
