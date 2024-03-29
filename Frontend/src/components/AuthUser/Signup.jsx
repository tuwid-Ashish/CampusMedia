import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../Store/AuthSlice";
function Signupform() {
  const [error, seterror] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  
  const onSignup = async (data) => {
    seterror("");
    console.log(data);
    dispatch(login(data))
    navigate(`/verifyEmail`)
  };
  return (
    
      <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSignup)} >

        <Input
          label="email"
          className="w-full"
          type="email"
          placeholder="Email"
          // className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
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
                /^\w+full([.-]?\w+full)*@\w+full([.-]?\w+full)*(\.\w{full2,3})+$/.test(value) ||
                "Email address must be validate";
              },
            },
          })}
          type="password"
          className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
          />
        <Input
          placeholder="username"
          label="username"
          {...register("username", { required: true })}
          className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
          />
        <Input
          placeholder="fullname"
          label="fullname"
          {...register("fullname", {required:true},)}
          className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
          />
          {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded-lg w-full"
          >
          Signup
        </button>
      </form>

  );
}

export default Signupform;
