import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

import Navbar from "./components/Home/Navbar/Navbar";
import Sidebar from "./components/Home/Sidebar/Sidebar";
import Achive from "./components/Home/Main/Achive";
import Notes from "./components/Home/Main/Notes";
import Bin from "./components/Home/Main/Bin";
import HomePage from "./components/Home/Main/HomePage";

import { usetemp } from "./redux/signer/tempUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
  {
    path: "/bin",
    element: <Bin />,
  },
  {
    path: "/achive",
    element: <Achive />,
  },
]);

function App() {
  const tempUser = useSelector((state) => state.tempUser.value);
  const issigned = useSelector((state) => state.signed.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className="flex relative justify-start h-[100%]">
        <Sidebar />
        {issigned ? <Notes /> : <HomePage />}

        {/* <Provider store={store}>
          <RouterProvider router={router} />
        </Provider> */}
      </div>

      <div></div>
    </>
  );
}

export default App;
