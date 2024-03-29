import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

import { useNavigate,Link } from "react-router-dom";
// import Input from "../Input";
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
    <>    
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form className="grid gap-4" onSubmit={handleSubmit(onSignup)} >
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
          placeholder="fullname"
          label="fullname"
          {...register("fullname", {required:true},)}
          className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
          />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">username</Label>
              <Input
             placeholder="username"
             label="username"
             {...register("username", { required: true })}
             className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
             />
             </div>
              </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Email</Label>
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
            </div>
            <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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
          {error && <div className="text-red-500">{error}</div>}
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Sign in
          </Link>
        </div>           </form>
          </CardContent>
          </Card>
        
        </>
 
  );
}

export default Signupform;
