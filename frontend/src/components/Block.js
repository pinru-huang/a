import React from "react";
import MenuSection from "./Menusection";
import { useNavigate } from "react-router-dom";
import { useApp } from "../hook";

const Restaurants = () => {
    // const navigate=useNavigate();
    const {status,setStatus}=useApp();
    const handleclick=(id)=>{
      const m=['Map','My-Bike','Nearest-Stations','Personal-Settings'];
      setStatus(m[id-1]);
    }
    const getRestaurants = () => {
      return [
        {
          desc: "Find the best place to park",
          id: 1,
          // image:
          //  "https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          //  image:"https://s3.amazonaws.com/com.thinkcrazy.ionicimageupload/lca3ktk621j3a8lgjuyi",
          image:"https://i.ibb.co/Z8V0M0c/map.jpg",
          title: "MAP"
        },
        {
          desc: "More about your bike",
          id: 2,
          // image:
          //   "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aWNlJTIwY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          image:"https://i.ibb.co/6t6JbXH/nuno-ricardo-ANICz-UXPSCk-unsplash.jpg",
          title: "MY BIKE"
        },
        {
          desc: "Choose a stop and navigate",
          id: 3,
          // image:
          //   "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          image:"https://i.ibb.co/6FhVX5F/stephane-mingot-e8ms-Pz-LTXx-U-unsplash.jpg",
          title: "NEARST STATION"
        },
        {
          desc: "Set your password",
          id: 4,
          // image:
          //   "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFyYmVxdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          image:"https://i.ibb.co/Zf0r0C5/brett-jordan-D44k-Ht8-Ex14-unsplash.jpg",
          title: "PERSONAL SETTING"
        }
      ].map((restaurant) => {
        const styles = {
          backgroundImage: `url(${restaurant.image})`
        };
        return React.createElement(
          "div",
          {
            key: restaurant.id,
            className: "restaurant-card",
            onClick:()=>handleclick(restaurant.id)
          },
          React.createElement(
            "div",
            {
              className:"restaurant-card-background background-image",
              style:styles
          }
          ),
          // <i className="fa-solid fa-map restaurant-card-background background-image"></i>,
          React.createElement(
            "div",
            { className: "restaurant-card-content" },
            React.createElement(
              "div",
              { className: "restaurant-card-content-items" },
              React.createElement(
                "span",
                { className: "restaurant-card-title" },
                restaurant.title
              ),
              React.createElement(
                "span",
                { className: "restaurant-card-desc" },
                restaurant.desc
              )
            )
          )
        );
      });
    };
    return React.createElement(
      MenuSection,
      {
        icon: "fa-solid fa-bicycle",
        id: "restaurants-section",
        title: "Have a nice day!"
      },
      getRestaurants()
    );
  };
  export default Restaurants;