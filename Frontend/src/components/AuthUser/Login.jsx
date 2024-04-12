// import Input from "../Input.jsx";
import { useState } from "react";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../Store/AuthSlice.js";
import { Button } from "../ui/button";
import axios from "axios";
import { Label } from "../ui/label";
// import { config } from "process";
function Loginform() {
  const [error, seterror] = useState();
  const [forget, setforget] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const userdata = useSelector((state) => state.Auth.user);
  const loginUser = async (data) => {
    axios
      .post(
        "http://localhost:4000/api/v1/users/login",
        data, { withCredentials: true })
       .then((res) => {
        console.log(res);
        dispatch(login(res.data.data));
        navigate("/");
      })
      .catch((err) => {
        console.log("the error on server side ", err);
        seterror("Invalid email or password");
      });
    console.log(data);
  };
  return (
    <>
      {/* <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div> */}
      <form
        onSubmit={handleSubmit(loginUser)}
        className="grid gap-4 dark:text-white "
      >
        <div className="grid gap-2 justify-items-start">
          <Label className="text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            lable="email"
            label="email"
            className="w-full"
            placeholder="m@example.com"
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
        </div>

        <div className="grid gap-2 justify-items-start">
          <Label htmlFor="password" className="text-lg float-start">
            Password
          </Label>
          <Input
            lable="password"
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
            className={
              "my-2 p-2  border-black border-spacing-2 w-full rounded-lg"
            }
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
        </div>
        <Button type="submit" className=" w-full">
          login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/signup"} className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default Loginform;
