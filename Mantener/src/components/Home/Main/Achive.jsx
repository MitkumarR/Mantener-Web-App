import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sign } from "../../../redux/signer/signerSlice";

function Achive() {
  const issigned = useSelector((state) => state.signed.value);

  return (
    <div className="w-[90%] flex justify-center items-center">
      {issigned ? (
        <div>Archive</div>
      ) : (
        <div className="my-auto  mt-10 justify-center items-center w-[90%] h-[100%]">
          <div className="opacity-70">
            <span className="text-xs text-center  font-light flex justify-center items-center">
              If you do not sign in, any notes you take will not be saved.
              Please<span className=" font-semibold"> &nbsp;Sign In  &nbsp;</span> to ensure your notes are securely stored and
              accessible in the future.
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
      )}
    </div>
  );
}

export default Achive;
