import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Signup() {
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
  const onSubmit = async (data) => {

    let r = await fetch("http://localhost:3000/", {method:"POST", headers: {
      "Content-Type": "application/json"}, body: JSON.stringify(data)});

    let res = await r.text();
    console.log(data, res);
    await delay(2);

    if(data.Username[0] === '0')
    {
      setError('pattern', {message:'first character must be letter'});
    }

  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("Username", {
            required: { value: true, message: "Username required" },
            minLength: {
              value: 4,
              message: "Minimum Length of Username should be 4",
            },
          })}
          type="text"
          placeholder="Username"
        />

        {errors.Username && (
          <span className=" text-red-500">{errors.Username.message}</span>
        )}
        <input
          {...register("Password", {
            required: { value: true, message: "Password required" },
            minLength: {
              value: 6,
              message: "Minimum Length of Username should be 6",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.Password && (
          <span className=" text-red-500">{errors.Password.message}</span>
        )}
        <input
          {...register("ConfirmPassword", {
            required: {
              value: true,
              message: "Please confirm password you have entered",
            },
            minLength: {
              value: 6,
              message: "Minimum Length of Username should be 6",
            },
          })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.ConfirmPassword && (
          <span className=" text-red-500">
            {errors.ConfirmPassword.message}
          </span>
        )}
        
        { isSubmitting && (<span className="text-white">Loading...</span>)}
        {errors.pattern && (<span className="text-red">{errors.pattern.message}</span>)}
       <input disabled={isSubmitting} type="Submit" className="text-white"/>
      </form>
    </div>
  );
}

export default Signup;
