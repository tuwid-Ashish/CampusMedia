import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react";
import Input from "../Input.jsx";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../Store/AuthSlice.js";
import axios from "axios";
import { Label } from "../ui/label.jsx";

function ResetPassword() {
  const [error, seterror] = useState();
  const [forget, setforget] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const localEmail = localStorage.getItem("email");
  const { register, handleSubmit } = useForm();
  const ResetPassword = async (data) => {
    seterror("");
    console.log(data);
    if (data.password !== data["confirm-password"]) {
      seterror("password and confirm password must be same");
      return;
    }

    axios
      .post("http://localhost:4000/api/v1/users/reset-password", {password:data.password, email:user?user.email:localEmail})
      .then((res) => {
        dispatch(login(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log("the error on server side ", err);
        seterror("user is not found with this email address");
      });
    console.log(data);
  };
  return (
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
           Create a new and Strong password
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form
      onSubmit={handleSubmit(ResetPassword)}
      className="grid gap-4"
    >
        <div className="grid gap-2">
          <Label htmlFor="email">password</Label>
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
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">confirm Password</Label>
          <Input
        label="confirm-password"
        placeholder="confirm"
        {...register("confirm-password", {
          required: true,
          validate: {
            matchPatern: (value) => {
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Password  must be validate";
            },
          },
        })}
        type="password"
        className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
      />
      {error && <p className="text-red-500">{error}</p>}
        <Button className="w-full">Reset</Button>
        </div>
        </form>
      </CardContent>   
    </Card>
  );
}

export default ResetPassword;
