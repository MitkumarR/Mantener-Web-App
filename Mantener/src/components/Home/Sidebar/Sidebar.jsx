import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { note, archive, bin } from "../../../redux/clicked/sidebarSlice";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { PiTrashLight, PiTrayArrowDownLight, PiNotePencilLight  } from "react-icons/pi";

function Sidebar() {
  const opt = useSelector((state) => state.sidebar.value);

  const dispatch = useDispatch();

  return (
    <div className="w-[10%] fixed top-20 left-0 right-0">
      <ul className="mx-10 border-r-white w-10 border-r-[1px] border-opacity-50 h-60">
        <li className="my-3">
          <Link to="/notes">
            <button
              onClick={() => dispatch(note())}
              className={`flex justify-center items-center rounded-full w-[2rem] h-[2rem] duration-150  ${
                opt === 0
                  ? "bg-blue-500 text-black duration-150"
                  : "hover:bg-blue-500 hover:bg-opacity-40 hover:duration-150"
              }`}
            >
              <PiNotePencilLight className="size-5"/>
            </button>
          </Link>
        </li>
        <li className="my-3">
          <Link to="/archive">
            <button
              onClick={() => dispatch(archive())}
              className={`flex justify-center items-center rounded-full w-[2rem] h-[2rem] duration-150 ${
                opt === 1
                  ? "bg-blue-500 text-black duration-150"
                  : "hover:bg-blue-500 hover:bg-opacity-40 hover:duration-150"
              }`}
            >
              <PiTrayArrowDownLight className="size-5"/>
            </button>
          </Link>
        </li>
        <li className="my-3">
          <Link to="/bin">
            <button
              onClick={() => dispatch(bin())}
              className={`flex justify-center items-center rounded-full w-[2rem] h-[2rem] duration-150  ${
                opt === 2
                  ? "bg-blue-500 text-black duration-150"
                  : "hover:bg-blue-500 hover:bg-opacity-40 hover:duration-150"
              }`}
            >
              <PiTrashLight className="size-5"/>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
