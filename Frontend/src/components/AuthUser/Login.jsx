import Input from "../Input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../Store/AuthSlice.js";
import axios from "axios";
function Loginform() {
  const [error, seterror] = useState();
  const [forget, setforget] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const loginUser = async (data) => {
    seterror("");
    axios
      .post("http://localhost:4000/api/v1/users/login", data)
      .then((res) => {
        dispatch(login(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log("the error on server side ", err);
        seterror("Invalid email or password");
      });
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className="flex flex-col justify-center"
    >
      <Input
        label="email"
        className="w-full"
        placeholder="Email"
        onchange={(e) => console.log(e.target.value)}
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
        className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => {
          setforget(!forget);
          navigate("/forgot-password");
        }}
        className="text-blue-500 text-sm font-semibold m-2 underline text-right"
      >
        forgot password
      </button>
      <button
        type="submit"
        className="bg-red-500 text-white p-2 rounded-lg w-full"
      >
        login
      </button>
    </form>
  );
}

export default Loginform;
