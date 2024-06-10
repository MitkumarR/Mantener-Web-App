import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiUser, CiLock, CiCircleCheck } from "react-icons/ci";
import { PiEye, PiEyeClosed } from "react-icons/pi";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [signupError, setsignupError] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const [isEyeOpen, setisEyeOpen] = useState(false);

  const handleisEyeOpen = () => {
    setisEyeOpen(!isEyeOpen);
  };

  const onSubmit = async (data) => {
    if (data.Password != data.ConfirmPassword) {
      setError("confirmPass", {
        message: "Please Check your password and then Confirm",
      });
    } else {
      // data.preventDefault();

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        setUsername(data.Username);
        setPassword(data.Password);
        const body = JSON.stringify({ username, password });

        const res = await axios.post(
          "http://localhost:3000/signup",
          body,
          config
        );

        setsignupError(false);

        if(!signupError)
          {
            setError("successfullySignup", {
              message: "Sign Up Successfully  ",
            });
          }
        console.log(res.data);
      } catch (err) {
        setsignupError(true);
        if(signupError)
          {
            setError("serverError", {
              message: "Server Error ! Please Try Again",
            });
          }
        console.log(errors.serverError.message);
        console.error(err.response.data);
      }
      // let r = await fetch("http://localhost:3000/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // let res = await r.text();
      // console.log(data, res);
      await delay(2);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-2 my-5">
        <svg
          width="40"
          height="40"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
        <span className="text-2xl">Mantener</span>
      </div>
      <div className="flex justify-center border  w-96  h-96 mx-auto  rounded-xl ">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`flex justify-center border-white border-[1px] rounded-full my-5 w-[15rem] h-[3rem] items-center mx-auto ${
              errors.Username && "border-red-900"
            }`}
          >
            <CiUser opacity={0.7} className="w-[1.5rem] h-[1.5rem] mr-2" />
            <input
              {...register("Username", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Minimum Length of Username should be 4",
                },
              })}
              type="text"
              placeholder="Username"
              className={`bg-black h-[2rem] focus:outline-none `}
            />
          </div>

          <div
            className={`flex justify-center border-white border-[1px] rounded-full my-5 w-[15rem] h-[3rem] items-center mx-auto ${
              errors.Password && "border-red-900"
            }`}
          >
            <CiLock opacity={0.7} className="w-[1.5rem] h-[1.5rem] mr-2" />
            <input
              {...register("Password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password should have atleast 6 letters",
                },
              })}
              type={`${isEyeOpen ? "text" : "password"}`}
              placeholder="Password"
              className={`bg-black h-[2rem] w-[10rem] focus:outline-none `}
            />

            {isEyeOpen ? (
              <PiEye
                opacity={0.7}
                onClick={handleisEyeOpen}
                className="w-[1rem] h-[1rem] mr-2"
              />
            ) : (
              <PiEyeClosed
                opacity={0.7}
                onClick={handleisEyeOpen}
                className="w-[1rem] h-[1rem] mr-2"
              />
            )}
          </div>

          <div
            className={`flex justify-center border-white border-[1px] rounded-full my-5 w-[15rem] h-[3rem] items-center mx-auto ${
              errors.ConfirmPassword && "border-red-900"
            }`}
          >
            <CiCircleCheck
              opacity={0.7}
              className="w-[1.5rem] h-[1.5rem] mr-2"
            />
            <input
              {...register("ConfirmPassword", {
                required: true,
              })}
              type="password"
              placeholder="Confirm Password"
              className={`bg-black h-[2rem] focus:outline-none ${
                errors.confirmPass && "border-red-900"
              }`}
            />
          </div>

          <div className="text-red-500 mx-auto text-sm ">
            {errors.Password && <span>{errors.Password.message}</span>}
            {errors.confirmPass && <span>{errors.confirmPass.message}</span>}
            {errors.Username && <span>{errors.Username.message}</span>}
            {errors.serverError && <span>{errors.serverError.message}</span>}    
          </div>

          <div className="text-blue-500 mx-auto text-sm ">
            {errors.successfullySignup && <span>{errors.successfullySignup.message}</span>}    
          </div>
          {isSubmitting && (
            <div className="flex justify-center items-center w-full ">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          )}
          <button
            disabled={isSubmitting}
            type="Submit"
            className="flex justify-center border-white border-[1px] rounded-full my-5 w-[8rem] h-[3rem] items-center mx-auto duration-500 hover:bg-white hover:text-black "
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
