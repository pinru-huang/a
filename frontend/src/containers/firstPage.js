import React ,{useEffect,useState}from "react";
import { useApp } from "../hook";
import Info from "../components/Info";
import UserStatusButton from "../components/UserButton";
import Background from "../components/Background";
import "./css/homepage.css"
import { useLocation } from "react-router-dom";
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
`;

const Titleb =styled.h1`
  transform: translateZ(.25px) scale(.75);
  transform-origin: 50% 100%;
  font-color:#ff3
`;
const Loading = () => {
    return React.createElement(
      "div",
      { id: "app-loading-icon" },
      React.createElement("i", { className: "fa-solid fa-spinner-third" })
    );
  };

const FirstPage=(props)=>{
    const {status,setStatus}=useApp();
    let location=useLocation();
    // useEffect(()=>{
    //   console.log(location);
    //   if(location==='/' && status!=='LoggedOut'){
    //     setStatus('LoggedOut');
    //   }
    // },[location])
    const getStatusClass = () => {
      if(status==="LoggedOut" )return "logged-out"
      else if(status==="LoggingIn") return "logging-in"
    };
    return(
      <>
        <div className="logged-out" id="app">
            
            <Info id="app-info"></Info>
            <Background/>
            {/* <Titlea><Titleb>NTU BIKING</Titleb></Titlea>  */}
            <div id="sign-in-button-wrapper">
                <UserStatusButton 
                    icon="fa-solid fa-arrow-right"
                    id="sign-in-button"
                    userStatus="LoggingIn"
                />
            </div>
        </div>
        {/**/}

      </>
    );
    // return React.createElement(
    //     "div",
    //     { id: "app", className:"logged-out" },
    //     // React.createElement(Info, { id: "app-info" }),
    //     React.createElement(Background, null),
    //     React.createElement(
    //       "div",
    //       { id: "sign-in-button-wrapper" },
    //       React.createElement(UserStatusButton, {
    //         icon: "fa-solid fa-arrow-right",
    //         id:"sign-in-button",
    //         userStatus: "LoggingIn"
    //       })
    //     ),
    //     // React.createElement(Loading, null)
    //   );
     
  };
export default FirstPage;
