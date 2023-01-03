import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../hook";
import api from "../connection";
import { FormControlUnstyledContext } from "@mui/base";
const TOKEN_KEY ='token';
const UserStatusButton = (props) => {
    const { status,setStatus} = useApp();
    const navigate=useNavigate();
    const handleOnClick = async() => {
      if(props.userStatus==='LoggedOut'){
        // navigate('/');
        
         try{
          await api.post('/users/logout')
          localStorage.remove(TOKEN_KEY);
          console.log('logout');
          props.val(false);
          console.log('hhhh');
          setStatus(props.userStatus);
        }catch(e){
          console.log('logout err');
          console.log(localStorage.getItem(TOKEN_KEY));
          props.val(false);
          setStatus(props.userStatus);

        }
      }else{
        const background=document.getElementById("app-background-image");
        //const login=document.getElementById("container");
        background.classList.add('blurr');
        // login.classList.add('blurr');
        setTimeout(() => {
          background.classList.remove('blurr');
          // navigate(`/LoggingIn`);
           setStatus(props.userStatus);

        }, 500);
        console.log('aaa');
        // if(i==null){
        //   setTimeout(() => {
        //   login.classList.remove('blurr');
            
        //   }, 300);
        // }
        
      }
      console.log(props.userStatus);
    };
    return React.createElement(
      "button",
      {
        id: props.id,
        className: "user-status-button clear-button",
        disabled: status === props.userStatus,
        type: "button",
        onClick: handleOnClick
      },
      React.createElement("i", { className: props.icon })
    );
    
  };

export default UserStatusButton;