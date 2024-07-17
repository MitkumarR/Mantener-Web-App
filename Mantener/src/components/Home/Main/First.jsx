import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update_signin } from "../../../redux/signer/signerSlice";
import { tempUse, update_tempUse } from "../../../redux/signer/tempUserSlice";
import { Link } from "react-router-dom";
import { Update, Erase } from "../../../redux/notes/array";
function First() {

  const issigned = useSelector((state) => state.signed.value);
  const istempUser = useSelector((state) => state.tempUser.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [dispatch]);

  useEffect(() =>{

    
    if(istempUser || issigned)
    {
      navigate("/notes");
    }

  })
  return (
        <div className="my-auto fixed top-20 left-20 right-0 mt-10 justify-center items-center w-[90%] h-[100%]">
      <div className="opacity-70">
      <span className="text-xs text-center  font-light flex justify-center items-center">
          If you do not sign in, any notes you take will not be saved. Please
          <span className=" font-semibold"> &nbsp;Sign In &nbsp;</span> to
          ensure your notes are securely stored and accessible in the future.
          </span>
          </div>
          
      <span className="text-xs text-center flex mt-32  opacity-50 justify-center items-center">
      Continue without Signing In ?
      </span>

      <span className="text-xs text-center my-2  flex justify-center items-center ">
        <Link
        to="/notes"
        className="flex justify-center items-center w-[20%] h-10"
        >
        <button 
        onClick={() =>{
          dispatch(update_signin());
          const newIsSignin = false;
          try {
            localStorage.setItem("issigned", JSON.stringify(newIsSignin));
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
          }

          dispatch(update_tempUse());
          const newTempUse = true;

          try {
            localStorage.setItem("tempUser", JSON.stringify(newTempUse));
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
          }

          dispatch(Erase());
          const newNotes = [];

          try {
            localStorage.setItem("Notes", JSON.stringify(newNotes));
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
          }
          }}
          className="text-sm text-center text-black flex justify-center items-center duration-500 w-[100%] h-10 rounded-full bg-blue-500 hover:text-blue-500 hover:bg-transparent border-[1px] border-blue-500 ">
        Use Temporary Notes
        </button>
        </Link>
        </span>
        </div>
       
    );
}

export default First;
