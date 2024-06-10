import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";
import Navbar from "./components/Home/Navbar/Navbar";
import Sidebar from "./components/Home/Sidebar/Sidebar";
import Archived from "./components/Home/Main/Archived";
import Notes from "./components/Home/Main/Notes";
import Bin from "./components/Home/Main/Bin";
import First from "./components/Home/Main/First";

import { usetemp } from "./redux/signer/tempUser";

function App() {
  const tempUser = useSelector((state) => state.tempUser.value);
  const issigned = useSelector((state) => state.signed.value);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (tempUser) {
  //     const handleBeforeUnload = (event) => {
  //       const confirmationMessage =
  //         "Are you sure you want to leave? All your data will be erased.";
  //       event.returnValue = confirmationMessage;
  //       return confirmationMessage;
  //     };

  //     const handleUnload = () => {
  //       localStorage.clear();
  //     };

  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //     window.addEventListener("unload", handleUnload);

  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //       window.removeEventListener("unload", handleUnload);
  //     };
  //   }
  // }, [tempUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <div className="flex relative justify-start h-[100%]">
            <Sidebar />
            <First />
          </div>

          <div></div>
        </>
      ),
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/notes",
      element: (
        <>
          <Navbar />
          <div className="flex relative justify-start h-[100%]">
            <Sidebar />
            <Notes />
          </div>

          <div></div>
        </>
      ),
    },
    {
      path: "/bin",
      element: (
        <>
          <Navbar />
          <div className="flex relative justify-start h-[100%]">
            <Sidebar />
            <Bin />
          </div>

          <div></div>
        </>
      ),
    },
    {
      path: "/archive",
      element: (
        <>
          <Navbar />
          <div className="flex relative justify-start h-[100%]">
            <Sidebar />
            <Archived />
          </div>

          <div></div>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
