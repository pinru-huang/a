// import React from 'react'
// import ReactDOM from 'react-dom/client';
// import './index.css';
// // import LoginPage from './containers/login';
// // import useRWD from './useRWD';
// // import FirstPage from './containers/firstPage';
// // import { useApp } from './hook';
// // import Menu from './containers/homePage';
// // import Loginmobile from './containers/login_mobile';

// import App from './App';
// import Map from './containers/map/Map';
// import MyBike, { action as myBikeAction, } from './containers/MyBike';
// import NearestStations from './containers/NearestStations';
// import PersonalSettings from './containers/PersonalSettings';
// import reportWebVitals from './reportWebVitals';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "Map",
//         element: <Map />,
//       },
//       {
//         path: "My-Bike",
//         element: <MyBike />,
//         action: myBikeAction,
//       },
//       {
//         path: "Nearest-Stations",
//         element: <NearestStations />,
//         //action: myBikeAction,
//       },
//       {
//         path: "Personal-Settings",
//         element: <PersonalSettings />,
//         //action: myBikeAction,
//       },
//     ]
//   },
// ]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Map from './containers/map/Map';
// import MyBike, { action as myBikeAction, } from './containers/MyBike';
// import NearestStations from './containers/NearestStations';
// import PersonalSettings from './containers/PersonalSettings';
// import reportWebVitals from './reportWebVitals';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "Map",
//         element: <Map />,
//       },
//       {
//         path: "My-Bike",
//         element: <MyBike />,
//         action: myBikeAction,
//       },
//       {
//         path: "Nearest-Stations",
//         element: <NearestStations />,
//         //action: myBikeAction,
//       },
//       {
//         path: "Personal-Settings",
//         element: <PersonalSettings />,
//         //action: myBikeAction,
//       },
//     ]
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient, InMemoryCache, ApolloProvider,
  split, HttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { AppProvider } from "./hook"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Map from './containers/map/Map';
import MyBike, { action as myBikeAction, } from './containers/MyBike';
import NearestStations from './containers/NearestStations';
import PersonalSettings from './containers/PersonalSettings';
const httpLink = new HttpLink({
uri: 'http://localhost:5000/graphql'
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:5000/graphql',
  options: {
    lazy: true,
  },
}));

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
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  console.log(token);
  if(token){
    return {
      headers: {
         ...headers,
        //  authorization: token ? `${token}` : "",
        'x-token':`${token}`
        // authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjJlODg5OGUwNmRkNDBhMWE0YmQ2NiIsImVtYWlsIjoiYmFubmFAYmFhbmFuYS5jb20iLCJuYW1lIjoiYWFuYW5hIiwiaWF0IjoxNjcyNjczNjkzLCJleHAiOjE2NzI3NjAwOTN9.d0BnRt6eyQLRUijGzOxxvbmWWzIMCl9X61yp7Xx18Pc"
      }
    }
  }
  
});
const client = new ApolloClient({
  link: authLink.concat(splitLink), 
  cache: new InMemoryCache(),
});
const root =ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider><RouterProvider router={router} /></AppProvider>
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();

