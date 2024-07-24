import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

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
  Open,
  Write,
  Color,
  Erase,
} from "../../../redux/notes/array";

import {
  PiPushPinThin,
  PiPushPinFill,
  PiTrashLight,
  PiTrayArrowDownLight,
  PiPlusLight,
} from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

import Archived from "./Archived";
import { Await } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Note() {
  const location = useLocation();
  const textareaRef = useRef(null);
  const { noteId } = location.state || {};

  const issigned = useSelector((state) => state.signed.value);
  const istempUser = useSelector((state) => state.tempUser.value);

  //   const wantAdd = useSelector((state) => state.added.value);
  //   const whattoAdd = useSelector((state) => state.adding.value);
  const Notes = useSelector((state) => state.notes.value);

  const isgridded = useSelector((state) => state.gridded.value);
  const userId = useSelector((state) => state.userid.value);
  const userName = useSelector((state) => state.username.value);
  const dispatch = useDispatch();
  // const issigned = true;

  const navigate = useNavigate();

  const note = Notes.find((item) => item.Id === noteId);

  const [T, setT] = React.useState(note ? note.Title : "");
  const [N, setN] = React.useState(
    note
      ? note.Note.replace(/<br\s*\/?>/gm, "\n").replace(/<[^>]*>?/gm, "")
      : ""
  );

  const [formattedNote, setFormattedNote] = useState("");

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
        } catch (error) {
          console.error("Error fetching data from  backend", error);
        }
      }
    };

    // if (issigned) {
    //   fetchData();
    // } else if (istempUser) {
    //   const NoteString = localStorage.getItem("Notes");
    //   if (NoteString) {
    //     try {
    //       const updatedNotes = JSON.parse(NoteString);
    //       if (Array.isArray(updatedNotes)) {
    //         dispatch(Update(updatedNotes));
    //       } else {
    //         console.error("Loaded data is not an array", updatedNotes);
    //       }
    //     } catch (error) {
    //       console.error("Error parsing JSON from localStorage", error);
    //     }
    //   }
    // }

    const handleBeforeUnload = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? All your data will be erased.";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handleUnload = () => {
      // localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [dispatch, issigned, navigate, istempUser, note]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [N]);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scroll height
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setN(value);
    // Replace newline characters with <br/>
    const formatted = value.replace(/\n/g, "<br>");
    setFormattedNote(formatted);

    adjustTextareaHeight();
    // setN(formattedNote);
  };

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
    const Opened = false;
    const Writable = false;
    const Bgcolor = 0;

    let user_name = localStorage.getItem("userName");
    user_name = user_name.replace(/^"|"$/g, "");

    const noteData = {
      Id,
      Title,
      Note,
      Deleted,
      Pinned,
      Archived,
      Opened,
      Writable,
      Bgcolor,
      Hovered,
    };

    if (issigned) {
      try {
        const response = await axios.post("http://localhost:3000/notes", {
          username: user_name,
          note: noteData,
        });

        if (response.status === 201) {
          setT("");
          setFormattedNote("");
          setN("");
          console.log(response.data.message);
        } else {
          console.error("Error saving note", response.data.message);
        }
      } catch (error) {
        console.error("Error saving note to backend", error);
      }
    } else {
      dispatch(Insert(noteData));
      const updatedNotes = [...Notes, noteData];
      saveToLocal("Notes", updatedNotes);

      setT("");
      setFormattedNote("");
      setN("");
    }
  };

  return (
    <>
      <div className="fixed z-20 h-screen w-[100%] blur-0 bg-black flex bg-opacity-70 justify-center items-center"></div>
      <div className="z-30 h-[50rem] pt-20 w-[100%] flex justify-center items-center">
        <div className="border-[1px] w-[30%] min-h-[3rem] h-fit p-2 rounded border-white bg-black">
          <form action="" method="post" onSubmit={handleSubmit(onSave)}>
            <div className="relative flex justify-start items-center pb-1">
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
              <Link to="/notes" className="absolute right-0 ">
                <button
                  onClick={() => {
                    //   dispatch(Hover(item.Id));
                    //   dispatch(Pin(item.Id));
                    //   const changedData = {
                    //     Pinned: !item.Pinned,
                    //     Deleted: false,
                    //     Archived: false,
                    //     Writable: true,
                    //   };
                    //   // saveToLocal(newNotes);
                    //   onChange(changedData, item.Id);
                  }}
                  className={`flex justify-center items-center rotate-45 rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20 
                        `}
                >
                  <PiPlusLight />
                </button>
              </Link>
            </div>

            <textarea
              {...register("takenNotes")}
              type="text"
              placeholder="Take notes..."
              value={N}
              ref={textareaRef}
              onChange={handleInputChange}
              // onChange={(e) => {
              //   setN(e.target.value);
              // }}
              className="overflow-hidden overflow-y-auto text-xs w-[100%] min-h-[10rem] h-fit max-h-[40rem] bg-black focus:outline-none"
              style={{ resize: "none" }}
            />

            <ul
              className={`relative flex justify-start items-center px-2 w-full gap-2 `}
            >
              <li className="flex justify-start items-center">
                <button
                  onClick={() => {
                    //   dispatch(Hover(item.Id));
                    //   dispatch(Pin(item.Id));
                    //   const changedData = {
                    //     Pinned: !item.Pinned,
                    //     Deleted: false,
                    //     Archived: false,
                    //     Writable: true,
                    //   };
                    //   // saveToLocal(newNotes);
                    //   onChange(changedData, item.Id);
                  }}
                  className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20 
                        `}
                >
                  <PiPushPinThin />
                </button>
              </li>
              <li className="flex justify-start items-center">
                <button
                  onClick={() => {
                    //   dispatch(Archive(item.Id));
                    //   const changedData = {
                    //     Pinned: false,
                    //     Deleted: false,
                    //     Archived: !item.Archive,
                    //     Writable: true,
                    //   };
                    //   // saveToLocal(newNotes);
                    //   onChange(changedData, item.Id);
                  }}
                  className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                >
                  <PiTrayArrowDownLight />
                </button>
              </li>
              <li className="flex justify-start items-center">
                <button
                  onClick={() => {
                    //   dispatch(Delete(item.Id));
                    //   const changedData = {
                    //     Pinned: false,
                    //     Deleted: !item.Deleted,
                    //     Archived: false,
                    //     Writable: false,
                    //   };
                    //   // saveToLocal(newNotes);
                    //   onChange(changedData, item.Id);
                  }}
                  className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                >
                  <PiTrashLight />
                </button>
              </li>
              <li className=" absolute right-0 flex justify-center items-center w-fit">
                <button
                  {...register("Save")}
                  type="Submit"
                  className="text-xs rounded-sm border-[1px] duration-150 border-blue-500 bg-blue-500 right-0 w-[3rem] flex justify-center items-center text-black hover:bg-black hover:text-blue-500"
                >
                  Save
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
}

export default Note;
