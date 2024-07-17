import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../../redux/signer/signerSlice";
import { tempUse, update_tempUse } from "../../../redux/signer/tempUserSlice";

import { add } from "../../../redux/adder/adderSlice";
import { note, list, draw, done } from "../../../redux/adding/addingSlice";
import { updateUsername } from "../../../redux/user/usernameSlice";
import {
  Insert,
  Delete,
  Update,
  Hover,
  Archive,
  Pin,
  Erase,
} from "../../../redux/notes/array";

import {
  PiPushPinThin,
  PiPushPinFill,
  PiTrashLight,
  PiTrayArrowDownLight,
} from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

import {
  PiPlusLight,
  PiNoteThin,
  PiListChecksThin,
  PiPaintBrushThin,
} from "react-icons/pi";
import Archived from "./Archived";
import { Await } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Notes() {
  const issigned = useSelector((state) => state.signed.value);
  const istempUser = useSelector((state) => state.tempUser.value);

  const wantAdd = useSelector((state) => state.added.value);
  const whattoAdd = useSelector((state) => state.adding.value);
  const Notes = useSelector((state) => state.notes.value);

  const isgridded = useSelector((state) => state.gridded.value);
  const userId = useSelector((state) => state.userid.value);
  const userName = useSelector((state) => state.username.value);
  const dispatch = useDispatch();
  // const issigned = true;

  const navigate = useNavigate();

  const [T, setT] = React.useState("");
  const [N, setN] = React.useState("");
  const [loaded, setLoaded] = useState(false);

  const [formattedNote, setFormattedNote] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setN(value);
    // Replace newline characters with <br/>
    const formatted = value.replace(/\n/g, "<br>");
    setFormattedNote(formatted);
    // setN(formattedNote);
  };


  useEffect(() => {

    const fetchData = async () => {
      if (istempUser) {
        const notes = [];
        dispatch(Update(notes));
      } else {
        try {
          let user_name = localStorage.getItem("userName");
          // let user_name = userName;
          if (!user_name) {
            console.error("User Name not found in localStorage");
            return;
          }

          user_name = user_name.replace(/^"|"$/g, "");

          const response = await axios.get(
            `http://localhost:3000/notes/${user_name}`
          );
          const notes = response.data;

          if (notes) {
            dispatch(Update(notes));
          }

          // if (username) {
          //   const updated_userName = username;
          //   dispatch(updateUsername(updated_userName));
          //   console.log(updated_userName);
          // }
        } catch (error) {
          console.error("Error fetching data from  backend", error);
        }
      }
    };

    if (issigned) {
      fetchData();
    } else if (istempUser) {
      const NoteString = localStorage.getItem("Notes");
      if (NoteString) {
        try {
          const updatedNotes = JSON.parse(NoteString);
          if (Array.isArray(updatedNotes)) {
            dispatch(Update(updatedNotes));
          } else {
            console.error("Loaded data is not an array", updatedNotes);
          }
        } catch (error) {
          console.error("Error parsing JSON from localStorage", error);
        }
      }
    }
    // const NoteString = localStorage.getItem("Notes");
    // if (NoteString) {
    //   try {
    //     const updatedNotes = JSON.parse(NoteString);
    //     if (Array.isArray(updatedNotes)) {
    //       dispatch(Update(updatedNotes));
    //     } else {
    //       console.error("Loaded data is not an array", updatedNotes);
    //     }
    //   } catch (error) {
    //     console.error("Error parsing JSON from localStorage", error);
    //   }
    // }
    // setLoaded(true);

    // fetchData();
    // getUsers();
  }, [dispatch, issigned, navigate, istempUser]);

  const saveToLocal = (item, params) => {
    try {
      localStorage.setItem(item, JSON.stringify(params));
    } catch (error) {
      console.log("Failed to save to localStorage:", error);
    }
  };

  const onSave = async (note) => {
    const Id = uuidv4();
    const Title = T;
    const Note = formattedNote;
    const Archived = false;
    const Deleted = false;
    const Pinned = false;
    const Hovered = false;

    let user_name = localStorage.getItem("userName");
    user_name = user_name.replace(/^"|"$/g, "");

    const noteData = { Id, Title, Note, Deleted, Pinned, Archived, Hovered };

    if(issigned)
    {
      try {
        const response = await axios.post("http://localhost:3000/notes", {
          username: user_name,
          note: noteData,
        });
  
        if (response.status === 201) {
          // dispatch(Insert(noteData));
          // const updatedNotes = [...Notes, noteData];
          // saveToLocal(updatedNotes);
  
          setT("");
          setFormattedNote("");
          setN("");
        } else {
          console.error("Error saving note", response.data.message);
        }
      } catch (error) {
        console.error("Error saving note to backend", error);
      }
      
    }
    else
    {
      dispatch(Insert(noteData));
      const updatedNotes = [...Notes, noteData];
      saveToLocal("Notes", updatedNotes); 

      setT("");
      setFormattedNote("");
      setN("");
    }
    
  };

  const onChange = async (changedData, itemId) => {
    let user_name = localStorage.getItem("userName");
    user_name = user_name.replace(/^"|"$/g, "");

    try {
      const response = await axios.post("http://localhost:3000/notes/change", {
        username: user_name,
        itemid: itemId,
        changes: changedData,
      });

      if (response.status === 201) {
        console.log(response.data.message);
      } else {
        console.error("Error saving note", response.data.message);
      }
    } catch (error) {
      console.error("Error saving note to backend", error);
    }
  };
  return (
    <div className="absolute inset-y-0 right-5 top-20 w-[90%] justify-center">
      <div className="h-fit w-[100%] justify-start items-center">
        <div className="flex justfy-start p-2 items-center">
          <button
            onClick={() => dispatch(add())}
            className="flex justify-center items-center border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
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
                  className="flex justify-center items-center border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
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
                  className="flex justify-center items-center  border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
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
                  className="flex justify-center items-center border-[1px] border-blue-500 rounded-full duration-300 text-blue-500 w-[2rem] h-[2rem] hover:bg-blue-500 hover:text-black"
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
              <form action="" method="post" onSubmit={handleSubmit(onSave)}>
                <input
                  {...register("Title")}
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
                  {...register("takenNotes")}
                  type="text"
                  placeholder="Take notes..."
                  value={N}
                  onChange={handleInputChange}
                  // onChange={(e) => {
                  //   setN(e.target.value);
                  // }}
                  className="overflow-hidden overflow-y-auto text-xs w-[100%] h-[10rem] bg-black focus:outline-none"
                />

                <div className="w-full flex justify-end">
                  <button
                    {...register("Save")}
                    type="Submit"
                    className="text-xs rounded-sm border-[1px] duration-150 border-blue-500 bg-blue-500 right-0 w-[10%] flex justify-center items-center text-black hover:bg-black hover:text-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ) : whattoAdd === 2 ? (
            <div></div>
          ) : whattoAdd === 3 ? (
            <div></div>
          ) : null}
        </div>

        <div className="text-sm opacity-50">Pinned</div>
        <div
          className={`${
            isgridded ? "grid justify-center" : "flex flex-wrap grid-cols-5"
          } h-fit mx-2 my-2 gap-2 `}
        >
          {Notes.map(
            (item) =>
              item.Pinned && (
                <div
                  key={item.Id}
                  onMouseEnter={() => {
                    dispatch(Hover(item.Id));
                  }}
                  onMouseLeave={() => {
                    dispatch(Hover(item.Id));
                  }}
                  className={`block border-[1px]  place-self-auto border-white ${
                    isgridded ? "w-[30rem]" : "w-[13rem]"
                  } h-fit rounded row-end-auto row-start-auto overflow-hidden ${
                    !item.Hovered ? "border-opacity-50" : "border-opacity-30"
                  }`}
                >
                  <div className="relative px-2 py-1 w-full min-h-8 flex justify-start items-center">
                    <h6>{item.Title}</h6>
                    <button
                      onClick={() => {
                        dispatch(Pin(item.Id));
                        const newNotes = Notes.map((note) =>
                          note.Id === item.Id
                            ? {
                                ...note,
                                Pinned: !note.Pinned,
                                Deleted: false,
                                Archived: false,
                                Hovered: false,
                              }
                            : note
                        );
                        // saveToLocal(newNotes);
                        onChange(newNotes, item.id);
                      }}
                      className={`absolute right-1 p-1 flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20 ${
                        !item.Hovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <PiPushPinFill />
                    </button>
                  </div>
                  <p
                    className="text-xs px-2 py-1 text-left w-full break-all"
                    dangerouslySetInnerHTML={{ __html: item.Note }}
                  ></p>
                  <ul
                    className={`flex justify-start items-center px-2 py-1 w-full gap-2 ${
                      !item.Hovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <li className="flex justify-start items-center">
                      <button
                        onClick={() => {
                          dispatch(Archive(item.Id));
                          const newNotes = Notes.map((note) =>
                            note.Id === item.Id
                              ? {
                                  ...note,
                                  Archived: !note.Archived,
                                  Deleted: false,
                                  Pinned: false,
                                  Hovered: false,
                                }
                              : note
                          );
                          // saveToLocal(newNotes);
                          onChange(newNotes, item.id);
                        }}
                        className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                      >
                        <PiTrayArrowDownLight />
                      </button>
                    </li>
                    <li className="flex justify-start items-center">
                      <button
                        onClick={() => {
                          dispatch(Delete(item.Id));
                          const newNotes = Notes.map((note) =>
                            note.Id === item.Id
                              ? {
                                  ...note,
                                  Deleted: !note.Deleted,
                                  Archived: false,
                                  Pinned: false,
                                  Hovered: false,
                                }
                              : note
                          );
                          // saveToLocal(newNotes);
                          onChange(newNotes, item.id);
                        }}
                        className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                      >
                        <PiTrashLight />
                      </button>
                    </li>
                  </ul>
                </div>
              )
          )}
        </div>
        <div className="text-sm opacity-50">Others</div>
        <div
          className={`${
            isgridded ? "grid justify-center" : "flex flex-wrap grid-cols-5"
          } h-fit mx-2 my-2 gap-2 `}
        >
          {Notes.map(
            (item) =>
              !item.Pinned &&
              !item.Archived &&
              !item.Deleted && (
                <div
                  key={item.Id}
                  onMouseEnter={() => {
                    dispatch(Hover(item.Id));
                  }}
                  onMouseLeave={() => {
                    dispatch(Hover(item.Id));
                  }}
                  className={`block border-[1px]  place-self-auto border-white ${
                    isgridded ? "w-[30rem]" : "w-[13rem]"
                  }  h-fit rounded row-end-auto row-start-auto overflow-hidden ${
                    item.Hovered ? "border-opacity-50" : "border-opacity-30"
                  }`}
                >
                  <div className="relative px-2 py-1 w-full min-h-8 flex justify-start items-center">
                    <h6>{item.Title}</h6>
                    <button
                      onClick={() => {
                        dispatch(Pin(item.Id));
                        const newNotes = Notes.map((note) =>
                          note.Id === item.Id
                            ? {
                                ...note,
                                Pinned: !note.Pinned,
                                Deleted: false,
                                Archived: false,
                                Hovered: false,
                              }
                            : note
                        );
                        // saveToLocal(newNotes);
                        onChange(newNotes, item.id);
                      }}
                      className={`absolute right-1 p-1 flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20 ${
                        item.Hovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <PiPushPinThin />
                    </button>
                  </div>
                  <p
                    className="text-xs px-2 py-1 text-left w-full break-all"
                    dangerouslySetInnerHTML={{ __html: item.Note }}
                  ></p>
                  <ul
                    className={`flex justify-start items-center px-2 py-1 w-full gap-2 ${
                      item.Hovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <li className="flex justify-start items-center">
                      <button
                        onClick={() => {
                          dispatch(Archive(item.Id));
                          const newNotes = Notes.map((note) =>
                            note.Id === item.Id
                              ? {
                                  ...note,
                                  Archived: !note.Archived,
                                  Deleted: false,
                                  Pinned: false,
                                  Hovered: false,
                                }
                              : note
                          );
                          // saveToLocal(newNotes);
                          onChange(newNotes, item.id);
                        }}
                        className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                      >
                        <PiTrayArrowDownLight />
                      </button>
                    </li>
                    <li className="flex justify-start items-center">
                      <button
                        onClick={() => {
                          dispatch(Delete(item.Id));
                          const newNotes = Notes.map((note) =>
                            note.Id === item.Id
                              ? {
                                  ...note,
                                  Deleted: !note.Deleted,
                                  Archived: false,
                                  Pinned: false,
                                  Hovered: false,
                                }
                              : note
                          );
                          // saveToLocal(newNotes);
                          onChange(newNotes, item.id);
                        }}
                        className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                      >
                        <PiTrashLight />
                      </button>
                    </li>
                  </ul>
                </div>
              )
          )}
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
}

export default Notes;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// const body = JSON.stringify({
//   id: userId,
//   note: noteData,
// });

// const response = await axios.post(
//   `http://localhost:3000/notes`,
//   body,
//   config
// );
