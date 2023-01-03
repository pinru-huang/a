// import logo from './logo.svg';
import './App.css';
import LogIn_o from "./containers/LogIn_old";
import Homepage from './containers/Homepage_old';
import Menu from './containers/homePage';
import LoginPage from './containers/login';
import Loginmobile from './containers/login_mobile';
import { useState, useEffect } from 'react';
// import ParkInModal from './containers/map/ParkInModal';
import { useApp } from './hook';
import useRWD from './useRWD';
import FirstPage from './containers/firstPage';
import { useLocation, useNavigate } from 'react-router-dom';
const LOCALSTORAGE_KEY = "save_me";
const loginBefore = localStorage.getItem(LOCALSTORAGE_KEY);
function App() {
  const {status,setStatus}=useApp();
  const [login, setLogin] = useState(loginBefore||false);
  const device=useRWD();
  const location=useLocation();
  const navigate=useNavigate();
  const m=['Map','My-Bike','Nearest-Stations','Personal-Settings'];
  const mb=['/Map','/My-Bike','/Nearest-Stations','/Personal-Settings']
  useEffect(()=>{
    localStorage.setItem(LOCALSTORAGE_KEY, login);
    console.log("login "+login);

    if(status!=='LoggedIn'&&login){
      setStatus('LoggedIn');
    }
  },[login])
  useEffect(()=>{
    if(status==='LoggedIn'&& !login){
      setLogin(true);}
    // }else if(status==='LoggedOut'&& login){
    //   setLogin(false);
    // }
    if(m.includes(status)){
      navigate(status);
    }
  },[status])
  useEffect(()=>{
    console.log(location.pathname);
    if(login && mb.includes(location.pathname)&&status==='LoggedOut'){
      console.log(location.pathname)
      setStatus(m[mb.indexOf(location.pathname)]);
    }
    if(login && location.pathname==='/' && status!=='LoggedIn'){
      setStatus('LoggedIn');
    }
  },[location])
  const likeRouter=()=>{
    switch(status){
      case 'LoggedOut':
        return <FirstPage/>
      case 'LoggingIn':
        return (device==='PC'?<LoginPage/>:<Loginmobile/>)
      case 'LoggedIn':
        return <Menu/>
      default:
        return;
    }
  }
  return (
    // login ?
    // <Homepage /> :
    // <LogIn onLogin={ () => setLogin(true) }/>
    // <ParkInModal></ParkInModal>
    (login?(status==='LoggedIn'?<Menu val={setLogin}/>:<Homepage/>):(status==="LoggedOut"?<FirstPage/>:(status==='LoggingIn'?(device==='PC'?<LoginPage/>:<Loginmobile/>):
    ((status==="LoggedIn")?<Menu val={setLogin}/>:<></>))))
  );
}

export default App;