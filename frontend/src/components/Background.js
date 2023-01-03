import React from "react";
import { useApp } from "../hook";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Titlea=styled.div`
@import url(https://fonts.googleapis.com/css?family=Nunito);

  position: relative;
  padding: 25vh 10%;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, .7);
  transform-style: inherit;
  text-align: center;
  font-size: 375%;
  color: #fff;
  text-shadow: 0 2px 2px #000;
  z-index:2;
  @media(max-width:450px){
    font-size:300%;
  }
`;

const Titleb =styled.h1`
  transform: translateZ(.25px) scale(.75);
  transform-origin: 50% 100%;
  font-color:#ff3
`;
const Background = () => {
    const {status,setStatus}=useApp();
    const navigate=useNavigate();
    const handleOnClick = () => {
      if (status === "LoggedOut") {
        const background=document.getElementById("app-background-image");
        //const login=document.getElementById("container");
        background.classList.add('blurr');
        // login.classList.add('blurr');
        setTimeout(() => {
          background.classList.remove('blurr');
          // navigate("/LoggingIn");
          setStatus("LoggingIn");
        }, 500);
      }
    };
    return React.createElement(
      "div",
      { id: "app-background", onClick: handleOnClick },
      React.createElement("div", {
        id: "app-background-image",
        className: "background-image"
      },
      <Titlea><Titleb>NTU BIKING</Titleb></Titlea>
      ),
      
    );
  };
export default Background;