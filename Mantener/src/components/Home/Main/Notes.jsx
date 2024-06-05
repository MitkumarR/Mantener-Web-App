import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sign } from "../../../redux/signer/signerSlice";
import { add } from "../../../redux/adder/adderSlice";
import { note, list, draw, done } from "../../../redux/adding/addingSlice";
import { Insert, Delete, Update } from "../../../redux/notes/array";

import { v4 as uuidv4 } from "uuid";

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
  const Notes = useSelector((state) => state.notes.value);

  const dispatch = useDispatch();
  // const issigned = true;

  const [T, setT] = React.useState("");
  const [N, setN] = React.useState("");

  useEffect(() => {
    const NoteString = localStorage.getItem("Notes");
    if (NoteString) {
      try {
        const updatedNotes = JSON.parse(NoteString);
        dispatch(Update(updatedNotes));
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, [dispatch]);

  const saveToLocal = (params) => {
    localStorage.setItem("Notes", JSON.stringify(params));
  };

  const save_data = () => {
    const Id = uuidv4();
    const Title = T;
    const Note = N;

    dispatch(Insert({ Id, Note, Title }));
    const updatedNotes = [...Notes, { Id, Title, Note }];
    console.log(Notes);
    saveToLocal(updatedNotes);
    setT("");
    setN("");
  };

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
                value={T}
                onChange={(e) => {
                  setT(e.target.value);
                }}
                className=" bg-black w-[90%] focus:outline-none"
              />
              <br />
              <textarea
                type="text"
                placeholder="Take notes..."
                value={N}
                onChange={(e) => {
                  setN(e.target.value);
                }}
                className="overflow-hidden overflow-y-auto text-xs w-[100%] h-[10rem] bg-black focus:outline-none"
              />
              <div className="w-full flex justify-end">
                <button
                  onClick={save_data}
                  className="text-xs rounded-sm border-[1px] duration-150 border-blue-500 bg-blue-500 right-0 w-[10%] flex justify-center items-center text-black hover:bg-black hover:text-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          ) : whattoAdd === 2 ? (
            <div></div>
          ) : whattoAdd === 3 ? (
            <div></div>
          ) : null}
        </div>

        <ul className="flex mx-2 my-2 gap-3">
          {Notes.map((item) => (
            <li key={item.Id} className="border-[1px] border-opacity-50 border-white w-[20%] rounded">
              <span className="text-sm ml-2 mt-2">{item.Title}</span><br />
              <span className="text-xs ml-2 mt-2">{item.Note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notes;
