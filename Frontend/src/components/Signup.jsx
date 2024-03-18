import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../Store/AuthSlice";
function Signupform() {
  const [error, seterror] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  
  const onSignup = async (data) => {
    seterror("");
    console.log(data);
    dispatch(login(data));
    navigate(`/verifyEmail`)
  };
  return (
    
      <form onSubmit={handleSubmit(onSignup)} >
        <div className="flex flex-col">

        <Input
          label="email"
          type="email"
          placeholder="Email"
          // className={"my-2 p-2  border-black border-spacing-2 w- rounded-lg"}
          {...register("email", {
            required: true,
            validate: {
              include: (email) => {
                email.includes("@gndec.ac.in") ||
                "Email must be of gndec.ac.in domain";
              },
            },
          })}
          />
        <Input
          label="password"
          placeholder="password"
          {...register("password", {
            required: true,
            validate: {
              matchPatern: (value) => {
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be validate";
              },
            },
          })}
          type="password"
          className={"my-2 p-2  border-black border-spacing-2 w- rounded-lg"}
          />
        <Input
          placeholder="username"
          label="username"
          {...register("username", { required: true })}
          className={"my-2 p-2  border-black border-spacing-2 w- rounded-lg"}
          />
        <Input
          placeholder="fullname"
          label="fullname"
          {...register("fullname", {required:true},)}
          className={"my-2 p-2  border-black border-spacing-2 w- rounded-lg"}
          />
        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded-lg my-2 mx-auto"
          >
          Signup
        </button>
          </div>
      </form>

  );
}

export default Signupform;
