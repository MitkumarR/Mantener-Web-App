import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    
      <App/>
    
    </Provider>
  </React.StrictMode>
);
