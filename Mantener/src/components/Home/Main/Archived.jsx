import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Delete, Update, Hover, Archive } from "../../../redux/notes/array";

import { PiTrashLight, PiTrayArrowUpLight } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

function Archived() {

  const issigned = useSelector((state) => state.signed.value);
  const istempUser = useSelector((state) => state.tempUser.value);

  const Notes = useSelector((state) => state.notes.value);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const isgridded = useSelector((state) => state.gridded.value);

  // useEffect(() => {
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
  //   setLoaded(true);
  // }, [dispatch]);

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
   
  }, [dispatch, issigned, istempUser]);

  const onChange = async (changedData, itemId) => {
    let user_name = localStorage.getItem("userName");
    user_name = user_name.replace(/^"|"$/g, "");

    if (issigned) {
      try {
        const response = await axios.post(
          "http://localhost:3000/notes/change",
          {
            username: user_name,
            itemid: itemId,
            changes: changedData,
          }
        );

        if (response.status === 201) {
          console.log(response.data.message);
        } else {
          console.error("Error saving note", response.data.message);
        }
      } catch (error) {
        console.error("Error saving note to backend", error);
      }
    }
  };

  const saveToLocal = (params) => {
    localStorage.setItem("Notes", JSON.stringify(params));
  };

  return (
    <div className="absolute inset-y-0 right-5 top-20 w-[90%] justify-center">
      <div className="h-[2rem] w-[100%] justify-start items-center">
        <div
          className={`${
            isgridded ? "grid justify-center" : "flex flex-wrap grid-cols-5"
          } h-fit mx-2 my-2 gap-2 `}
        >
          {
            Notes.map(
              (item) =>
                item.Archived && (
                  <div
                    key={item.Id}
                    onMouseEnter={() => dispatch(Hover(item.Id))}
                    onMouseLeave={() => dispatch(Hover(item.Id))}
                    className={`block border-[1px]  place-self-auto border-white ${
                      isgridded ? "w-[30rem]" : "w-[13rem]"
                    } h-fit rounded row-end-auto row-start-auto overflow-hidden ${
                      item.Hovered ? "border-opacity-50" : "border-opacity-30"
                    }`}
                  >
                    <div className="relative px-2 py-1 w-full min-h-8 flex justify-start items-center">
                      <h6>{item.Title}</h6>
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
                            // const newNotes = Notes.map((note) =>
                            //   note.Id === item.Id
                            //     ? {
                            //         ...note,
                            //         Archived: !note.Archived,
                            //         Deleted: false,
                            //         Pinned: false,
                            //         Hovered: false,
                            //       }
                            //     : note
                            // );
                            const changedData = {
                              Pinned: false,
                              Deleted: false,
                              Archived: !item.Archived,
                            };
                            // saveToLocal(newNotes);
                            onChange(changedData, item.Id);
                          }}
                          className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] hover:bg-white hover:bg-opacity-20`}
                        >
                          <PiTrayArrowUpLight />
                        </button>
                      </li>
                      <li className="flex justify-start items-center">
                        <button
                          onClick={() => {
                            dispatch(Delete(item.Id));
                            // const newNotes = Notes.map((note) =>
                            //   note.Id === item.Id
                            //     ? {
                            //         ...note,
                            //         Deleted: !note.Deleted,
                            //         Archived: false,
                            //         Pinned: false,
                            //         Hovered: false,
                            //       }
                            //     : note
                            // );
                            const changedData = {
                              Pinned: false,
                              Deleted: !item.Deleted,
                              Archived: false,
                            };
                            // saveToLocal(newNotes);
                            onChange(changedData, item.Id);
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

export default Archived;
