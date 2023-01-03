import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from "./hook"
import Map from './containers/map/Map';
import MyBike, { action as myBikeAction, } from './containers/MyBike';
import NearestStations from './containers/NearestStations';
import PersonalSettings from './containers/PersonalSettings';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "Map",
        element: <Map />,
      },
      {
        path: "My-Bike",
        element: <MyBike />,
        action: myBikeAction,
      },
      {
        path: "Nearest-Stations",
        element: <NearestStations />,
        //action: myBikeAction,
      },
      {
        path: "Personal-Settings",
        element: <PersonalSettings />,
        //action: myBikeAction,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider><RouterProvider router={router} /></AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

