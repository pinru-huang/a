import "../css/modal.scss"
import { useEffect,useState, useRef } from "react"
import Pictures from "./switchPictures"
function Modal({open, scroll, setScroll, data, calculateRoute, time_dis, setOpenParking}){
    // const [openParking, setOpenParking] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    // console.log("t: ", time_dis.dur)
    const getPriceTag = (price) => {
      let priceText = ""
      for (let i = 0; i < price; i++)
          priceText += "🚲"
      return (
          <>
              <p className="modal-desc" style={{marginBottom: "0px"}}>車輛多寡:  </p>
              <div className='density-tag' key={priceText}>{priceText}</div>
              {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
          </>
      )
    }

    var body = null;
    var modal = null;
    var modalButton = null
    var closeButton =null 
    var scrollDown = null
    // const modalRef = useRef()
    // const scrollDownRef = useRef()
    // var isOpened = false
    useEffect(()=>{
        body = document.querySelector("body");
        modal = document.querySelector(".modal");
        modalButton = document.querySelector(".modal-button");
        closeButton = document.querySelector(".close-button");
        scrollDown = document.querySelector(".scroll-down");
    },[])

    useEffect(()=>{
      setIsOpen(scroll)
    },[scroll])

    const openModal = () => {
        // modalRef.current.classList.add("is-open");
        setIsOpen(true)
        // body.style.overflow = "hidden";
      };

      const closeModal = () => {
        setIsOpen(false)
        setScroll(false)
        // body.style.overflow = "initial";
      };
    // window.addEventListener("scroll", () => {
    //     if (window.scrollY > window.innerHeight / 3 && !isOpened) {
    //       isOpened = true;
    //       scrollDownRef.current.style.display = "none";
    //       openModal();
    //     }
    //   });
    if(!open) {
      return <></>
    }
    return <>
    
    {/* <div className="scroll-down" > */}
  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
</svg> */}
{/* </div> */}
<div className="container"></div>
<div className={isOpen ? "modal is-open" : "modal"}>
  <div className="modal-container">
    <div className="modal-left">
      <h1 className="modal-title" style={{marginBottom: "0px"}}>{data.label}</h1>
      <p className="modal-desc" style={{marginBottom: "0px"}}>{"距離您的位置: " + time_dis.dis}</p>
      <p className="modal-desc" style={{marginBottom: "0px"}}>{"路程: " + time_dis.dur }{getPriceTag(data.density)}</p>
      
      {/* <div className="input-block">
        <label for="email" className="input-label">Email</label>
        <input type="email" name="email" id="email" placeholder="Email"/>
      </div>
      <div className="input-block">
        <label for="password" className="input-label">Password</label>
        <input type="password" name="password" id="password" placeholder="Password"/>
      </div> */}
      <div className="modal-buttons">
        {/* <a href="" className="">Forgot your password?</a> */}
        <button className="input-button" style={{marginLeft: "auto", marginRight: "auto"}} onClick={()=>{setOpenParking(true); setScroll(false);}}>Park In</button>
        <button className="input-button" style={{marginLeft: "auto", marginRight: "auto"}} onClick={()=>{calculateRoute(0); setScroll(false)}}>navigate</button>
      </div>
      {/* <p className="sign-up">Don't have an account? <a href="#">Sign up now</a></p> */}
    </div>
    <div className="modal-right">
      {/* <img src={data.src} alt=""/> */}
      <Pictures pics={data.pics}></Pictures>
    </div>
    <button className="icon-button close-button" onClick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
        </svg>
      </button>
  </div>
  {/* <button className="modal-button" onClick={openModal}>Click here to login</button> */}
</div>
      
</>
}
export default Modal