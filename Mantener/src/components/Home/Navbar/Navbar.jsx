import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { change } from "../../../redux/clicked/clickedSlice";
import { refresh } from "../../../redux/refresher/refresherSlice";
import { grid, update } from "../../../redux/gridded/griddedSlice";
import { white, black, updatetheme } from "../../../redux/theme/themeSlice";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { CiGrid2H, CiGrid41, CiRedo, CiSettings, CiUser } from "react-icons/ci";

function Navbar() {
  const isClicked = useSelector((state) => state.clicked.value);
  const isRefreshed = useSelector((state) => state.refreshed.value);
  const isgridded = useSelector((state) => state.gridded.value);
  const theme = useSelector((state) => state.theme.value);
  const issignedIn = useSelector((state) => state.signed.value);

  const [isClickedOnSetting, setisClickedOnSetting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const selected_grid = localStorage.getItem("isgridded");
    const selected_theme = localStorage.getItem("theme");

    if (selected_grid) {
      try {
        const parsedGrid = JSON.parse(selected_grid);
        dispatch(update(parsedGrid));
      } catch (error) {
        console.error("Failed to parse localStorage item 'opt':", error);
      }
    }

    if (selected_theme) {
      try {
        const parsedTheme = JSON.parse(selected_theme);
        dispatch(update(parsedTheme));
      } catch (error) {
        console.error("Failed to parse localStorage item 'theme':", error);
      }
    }
  }, [dispatch]);

  const saveToLocal = (params) => {
    try {
      localStorage.setItem("isgridded", JSON.stringify(params));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };
  const saveToLocalTheme = (params) => {
    try {
      localStorage.setItem("theme", JSON.stringify(params));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onRefresh = async () => {
    dispatch(refresh());
    await delay(2);
    dispatch(refresh());
  };

  const handleisClickedOnSetting = () => {
    setisClickedOnSetting(!isClickedOnSetting);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 bg-black`}>
      <div
        className={`flex border-b-[1px] border-white p-3  z-10 border-opacity-50 justify-center items-center my-2 text-white w-[100%] `}
      >
        <div className={`Logo mx-[2%] flex justify-center w-[10%]`}>
          <svg
            width={`2rem`}
            height={`2rem`}
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-2 w-[2rem] h-[2rem]"
          >
            <path
              d="M0.5 25.9999C0.5 20.3734 2.31628 15.186 5.402 10.9641V41.0355C2.31634 36.8119 0.5 31.6147 0.5 25.9999Z"
              stroke="white"
            />
            <path
              d="M15.5824 20.1669C14.5125 18.2255 13.9814 15.9591 13.9814 13.351V3.50836C17.5544 1.59388 21.6554 0.5 26.0004 0.5C31.2497 0.5 36.1403 2.08746 40.1904 4.81445V13.364C40.1904 15.9418 39.6352 18.1965 38.5501 20.1547C37.4782 22.0864 35.9729 23.5932 33.998 24.7058C32.0566 25.7883 29.7516 26.345 27.0794 26.345C24.4086 26.345 22.1027 25.7888 20.1338 24.7052C18.1853 23.6055 16.6671 22.0987 15.5824 20.1669Z"
              stroke="white"
            />
            <path
              d="M13.9814 48.2038V27.4077C15.312 29.5986 17.0385 31.3192 19.1697 32.5673L19.1697 32.5673L19.1753 32.5705C21.6295 33.9652 24.2626 34.6638 27.0924 34.6638C29.9222 34.6638 32.5553 33.9652 35.0094 32.5705L35.0112 32.5695C37.1619 31.3355 38.8899 29.6203 40.2034 27.4264V29.7178C40.2034 30.9075 40.675 31.9695 41.4548 32.7494C42.2347 33.5292 43.2967 34.0008 44.4864 34.0008C46.8566 34.0008 48.7694 32.0728 48.7694 29.7178V14.5037C50.5148 17.9543 51.5004 21.8638 51.5004 25.9998C51.5004 40.0758 40.0891 51.4998 26.0004 51.4998C21.6413 51.4998 17.5504 50.4116 13.973 48.4833C13.9786 48.3918 13.9814 48.299 13.9814 48.2038Z"
              stroke="white"
            />

            <defs>
              <clipPath id="clip0_93_19">
                <rect width="52" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className=" flex justify-normal text-center items-center">
            Mantener
          </span>
        </div>

        <div className={`flex justify-center items-center mx-[1%] w-[50%]`}>
          <div
            className={`border-[1px] border-white rounded-full  w-[90%] h-[2rem] flex justify-start items-center ${
              isClicked ? "hover:opacity-100" : "opacity-50"
            }`}
          >
            <input
              type="text"
              name="Searchbar"
              onClick={() => dispatch(change())}
              className={`bg-black focus:outline-none text-sm mx-3 w-[87%]`}
              placeholder="Search By Title"
            />

            {isClicked && (
              <button
                onClick={() => dispatch(change())}
                className={`rounded-full hover:bg-zinc-800 w-[1.5rem] h-[1.5rem] flex justify-center items-center `}
              >
                <RxCross1 className="size-3" />
              </button>
            )}
          </div>
          <button
            className={`border-[1px] border-white rounded-full mx-2 w-[2rem] h-[2rem] flex justify-center items-center my-auto ${
              isClicked ? "hover:opacity-100" : "opacity-50"
            }`}
          >
            <GoSearch />
          </button>
        </div>

        <ul
          className={`flex justify-center gap-5 items-center mx-[2%] w-[30%]`}
        >
          <li>
            <button
              onClick={onRefresh}
              className={`Refresh flex justify-center items-center rounded-full w-7 h-7 hover:bg-blue-500 hover:bg-opacity-40`}
            >
              {isRefreshed ? (
                <AiOutlineLoading3Quarters className={`size-4 animate-spin`} />
              ) : (
                <CiRedo className={`size-5`} />
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(grid());
                const newGrid = !isgridded;
                saveToLocal(newGrid);
              }}
              className={`GridStyle flex justify-center items-center rounded-full w-7 h-7 hover:bg-blue-500 hover:bg-opacity-40`}
            >
              {isgridded ? (
                <CiGrid41 className={`size-5`} />
              ) : (
                <CiGrid2H className={`size-5`} />
              )}
            </button>
          </li>
          <li>
            <button
              onClick={handleisClickedOnSetting}
              className={`Setting flex justify-center items-center rounded-full w-7 h-7 hover:bg-blue-500 hover:bg-opacity-40`}
            >
              <CiSettings className="size-5" />
            </button>
          </li>
        </ul>

        {isClickedOnSetting && (
          <div
            className={`absolute right-[9rem] top-[4.5rem] border-[1px] w-[10rem] text-[10px] h-fit border-white bg-black border-opacity-30 rounded`}
          >
            <ul className={`p-1`}>
              <li
                className={`p-0.5 hover:bg-white hover:bg-opacity-10 rounded`}
              >
                <button
                  onClick={() => {
                    theme === "black" ? dispatch(white()) : dispatch(black());
                  }}
                >
                  {theme === "black" ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
              <li
                className={`p-0.5 hover:bg-white hover:bg-opacity-10 rounded`}
              >
                <button>Help</button>
              </li>
            </ul>
          </div>
        )}

        {issignedIn ? (
          <div className="flex justify-center w-full gap-3 items-center">
            <div className="User p-1 rounded-full border-white border-[1px] size-8 flex justify-center items-center">
              <CiUser className="size-5 " />
            </div>
            <div className="flex justify-center items-center">Hi ! username</div>
          </div>
        ) : (
          <div className="flex justify-center  items-center w-full">
            <div className="text-[10px] text-blue-500 w-[8rem]">
              Using for short time
            </div>

            <Link to="/signin" className={`w-[10%] mx-[2%]`}>
              <button
                className={`rounded-full text-sm border-white border-[1px] w-[5rem] text-center h-8 flex justify-center items-center hover:text-black hover:bg-blue-500 hover:border-blue-500 hover:duration-500`}
              >
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
