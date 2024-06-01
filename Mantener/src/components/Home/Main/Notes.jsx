import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { sign } from "../../../redux/signer/signerSlice";
import { add } from "../../../redux/adder/adderSlice";
import { note, list, draw, done } from "../../../redux/adding/addingSlice";

import { v4 as uuidv4 } from 'uuid';

import {
  PiPlusLight,
  PiNoteThin,
  PiListChecksThin,
  PiPaintBrushThin,
} from "react-icons/pi";

function Notes() {
  const issigned = useSelector((state) => state.signed.value);
  const wantAdd = useSelector((state) => state.added.value);

  const whattoAdd = useSelector((state) => state.adding.value);

  const dispatch = useDispatch();
  // const issigned = true;
  const [List, setList] = useState("");
  const [Lists, setLists] = useState([]);

  const [value, setValue] = useState("To do ...");

  useEffect(() => {
    const ListString = localStorage.getItem("Lists");
    if (ListString) {
      try {
        const Lists = JSON.parse(ListString);
        setLists(Lists);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
      setValue(inputValue);
      setList(inputValue);

  };

  const saveToLocal = (params) =>{
    localStorage.setItem("Lists", JSON.stringify(params));
  }

  return (
    <div className=" fixed top-20 left-20 right-0 w-[90%] h-[100vh] justify-center">
      {/* {issigned ? (
        <div>Notes</div>
      ) : (
        <div className="my-auto  mt-10 justify-center items-center w-[90%] h-[100%]">
          <div className="opacity-70">
            <span className="text-xs text-center  font-light flex justify-center items-center">
              If you do not sign in, any notes you take will not be saved.
              Please
              <span className=" font-semibold"> &nbsp;Sign In &nbsp;</span> to
              ensure your notes are securely stored and accessible in the
              future.
            </span>
          </div>

          <span className="text-xs text-center flex mt-32  opacity-50 justify-center items-center">
            Continue without Signing In ?
          </span>

          <span className="text-xs text-center my-2  flex justify-center items-center ">
            <button className="text-sm text-center text-black flex justify-center items-center duration-500 w-[20%] h-10 rounded-full bg-blue-500 hover:bg-black hover:text-blue-500 border-[1px] border-blue-500 ">
              Use Temporary Notes
            </button>
          </span>
        </div>
      )} */}

      <div className="h-[2rem] w-[100%] justify-start items-center">
        <div className="flex justfy-start p-2 items-center">
          <button
            onClick={() => dispatch(add())}
            className="flex justify-center items-center bg-black border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
          >
            <PiPlusLight
              className={`${wantAdd ? "rotate-45" : ""} duration-300`}
            />
          </button>
          {wantAdd && (
            <ul className="flex justify-center mx-5 items-center gap-3 duration-300">
              <li>
                <button
                  onClick={() => {
                    dispatch(note());
                    dispatch(add());
                  }}
                  className="flex justify-center items-center bg-black border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
                >
                  <PiNoteThin />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(list());
                    dispatch(add());
                  }}
                  className="flex justify-center items-center bg-black border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
                >
                  <PiListChecksThin />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(draw());
                    dispatch(add());
                  }}
                  className="flex justify-center items-center bg-black border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
                >
                  <PiPaintBrushThin />
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="h-auto w-[100%] flex justify-center items-center">
          {whattoAdd === 1 ? (
            <div className="border-[1px] w-[50%] h-auto p-2 rounded border-white bg-black">
              <input
                type="text"
                placeholder="Title"
                className=" bg-black w-[90%] focus:outline-none"
              />
              <br />
              <textarea type="text" placeholder="Take notes..." className="overflow-hidden overflow-y-auto text-xs w-[100%] h-[10rem] bg-black focus:outline-none"/>

            </div>
          ) : whattoAdd === 2 ? (
            <div></div>
          ) : whattoAdd === 3 ? (
            <div></div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Notes;
