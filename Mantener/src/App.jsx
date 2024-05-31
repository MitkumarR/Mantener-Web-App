import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Home/Navbar/Navbar";
import Sidebar from "./components/Home/Sidebar/Sidebar";
import Achive from "./components/Home/Main/Achive";
import Notes from "./components/Home/Main/Notes";
import Bin from "./components/Home/Main/Bin";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <hr className=" opacity-50"/>
      <div className="flex justify-start">
        <Sidebar/> 
        <Notes/>
      </div>

      <div>
        
      </div>
    </>
  );
}

export default App;
