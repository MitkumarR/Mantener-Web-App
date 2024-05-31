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
            <span className="text-xs text-center flex justify-center items-center">
              If you do not sign in, any notes you take will not be saved.
              Please sign in to ensure your notes are securely stored and
              accessible in the future.
            </span>
          </div>
          <div>
            <span className="text-xs text-center flex justify-center items-center">Thank you!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achive;
