import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hook';
import loginm from  './css/login_mobile.module.css'
import Loading from '../components/Loading';
import styled from 'styled-components';
const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max),
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  };
const Warning=styled.p`
  font-family:'Ubuntu', sans-serif;
  color:rgb(207, 2, 2);
  font-size:12px;
  transition:linear 100ms ease-in;
  font-weight:700;
  &:hover{
    font-weight:800;
    text-shadow: 0.05em 0.05em 0.01em black
  }
`;

const Login_mobile=()=>{
    const [inup,setInup]=useState(false);
    const [loading,setLoading]=useState(false);
    const {status,setStatus,data,handlelogin,handlesignup,handleUpdateInfo,err}=useApp();
    const [names,setNames]=useState('');
	const [emails,setEmails]=useState('');
	const [passwords,setPasswords]=useState('');
    const [password, setPassword] = useState("");
	const [email,setEmail]=useState('');
    const navigate=useNavigate();
	// const handleclick=()=>{
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         setStatus('LoggedIn');
    //         navigate('/LoggedIn');
        
    //     }, N.rand(1000,2000));
	// }
    // useEffect(()=>{
	// 	if(status==='LoggedIn')
	// 	{
	// 		console.log("aaaaaaaa"+status);
	// 		if(localStorage.getItem('token'))
	// 			navigate('/');
		
	// 	}
	// },[status])
    // useEffect(()=>{
    //     console.log(err);
    // },[err])
    useEffect(()=>{
		if(err==='n'){
			setInup(false);
		}
	},[err])
    const handlesubmitl=(e)=>{
		e.preventDefault();
		handlelogin(email,password);
        console.log('aa');

	}
	const handlesubmits=(e)=>{
		e.preventDefault();
		handlesignup(names,emails,passwords);
        console.log('aa');

	}
    return(
        <div className={loginm.container_body}>
        <Loading loading={loading}/>
        <div className={loginm["form-structor"]}>
            <form className={loginm.signup+(inup?"":" "+loginm["slide-up"])} onSubmit={handlesubmits}>
                <h2 className={loginm["form-title"]} id="signup" onClick={()=>{setInup(true)}}><span>or</span>Sign up</h2>
                <div className={loginm["form-holder"]}>
                    <input type="text" className={loginm.input} placeholder="Name" onChange={(e)=>setNames(e.target.value)}/>
                    <input type="email" className={loginm.input} placeholder="Email" onChange={(e)=>setEmails(e.target.value)}/>
                    <input type="password" className={loginm.input} placeholder="Password" onChange={(e)=>setPasswords(e.target.value)}/>
                </div>
                {err==='s'?<Warning>Email or name duplicate!</Warning>:<></>}
                <button className={loginm["submit-btn"]}>Sign up</button>
            </form>
            <form className={loginm.login+(inup?(" "+loginm["slide-up"]):"")} onSubmit={handlesubmitl}>
                <div className={loginm.center}>
                    <h2 className={loginm["form-title"]} id="login" onClick={()=>{setInup(false)}}><span>or</span>Log in</h2>
                    <div className={loginm["form-holder"]}>
                        <input type="email" className={loginm.input} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" className={loginm.input} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    {err==='l'?<Warning>Worng email or password!</Warning>:<></>}
                    <button className={loginm["submit-btn"]} >Log in</button>
                </div>
            </form>
        </div>
        </div>
    );
}
export default Login_mobile