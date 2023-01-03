import { useState,useEffect,useContext,createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {ME,UPDATE_MY_INFO,SINGUP,LOGIN,ME_SUBSCRIPTION } from "./graphql";
import { Navigate } from "react-router-dom";

const AppContext=createContext({
    status:"",
    err:'',
    setStatus:()=>{}
});
const TOKEN_KEY ='token';
const ME_KEY='save-me';
const savedMe=localStorage.getItem(ME_KEY);
const AppProvider=(props)=>{
    const [status,setStatus]=useState("LoggedOut");
    const [err,setErr]=useState("");
    const [me,setMe]=useState(savedMe||{})
    const [flag,setFlag]=useState(true);
    const [flag2,setFlag2]=useState(true);
    const {data,loading,subscribeToMore}=useQuery(ME,{})
    const [signup,{loading1,error:error1}]=useMutation(SINGUP,{
        onCompleted({signup}){
            console.log(signup);
                setErr('n');
            
        }
    });
    // if(error1 && flag) {
    //     if(err!=='s'){
    //         console.log(error1);
    //         setErr('s');
    //         setFlag(false)
    //     }
    // }
    const handlesignup=async(name,email,password)=>{
        console.log('a');
        setFlag(true);
        setFlag2(true);
        setErr('');
        await signup({
            variables:{
                name,email,password
            }
        })
        console.log('a');
    }

    const [login, { loading2, error:error2 }] = useMutation(LOGIN, {
        onCompleted({ login }) {
          if (login) {
            localStorage.setItem(TOKEN_KEY, login.token);
            console.log(login);
            setStatus('LoggedIn');
          }
        },
      });
      if((error2 ||error1)&& flag) {
        if(flag2){
         console.log('login error! '+error2);
         setErr('s');
        }else{
            setErr('l')
        }
        // Navigate('/LoggingIn'); 
        setFlag(false);

      }
    const handlelogin=async(email,password)=>{
        console.log('b')
        setFlag(true);
        setFlag2(false);
        setErr('');
        await login({
            variables:{
                email,password
            }
        })
        console.log('b')
    }
    const [updateMyInfo,{loading4,error:error3}]=useMutation(UPDATE_MY_INFO);
    const handleUpdateInfo=async(name,age,opassword,npassword)=>{
        console.log('c');
        console.log(opassword+npassword);
        await updateMyInfo({
            variables:{
                opassword:opassword,npassword:npassword
            }
        })
        console.log('c');
    }
    useEffect(() => {
        try {
            // console.log('yffff');
            subscribeToMore({
                document: ME_SUBSCRIPTION,
                variables: { email: me.email},
                updateQuery: (prev, { subscriptionData }) => {
                    console.log('e');
                    if (!subscriptionData.data) return prev;
                    const newme = subscriptionData.data.newme;
                    //setMessages([...prev.chatBox.messages, newMessage])
                    localStorage.setItem(ME_KEY,newme);
                    console.log('e');
                    return {
                        me: newme
                    };
                },
            });
        } catch (e) {}
    }, [subscribeToMore]);
    
    return(
        <AppContext.Provider
            value={{status,setStatus,handlelogin,handlesignup,handleUpdateInfo,err,setErr}}
            {...props}
        />
    );
}
const useApp=()=>useContext(AppContext)
export {AppProvider,useApp};