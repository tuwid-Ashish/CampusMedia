import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from '../../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
function ForgotPassword() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changePassword = (data) => {
        console.log(data);
        dispatch(login(data));
        localStorage.setItem('email', data.email)
        navigate(`/verifyEmail`)
    }
  return (
    <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Email Address</CardTitle>
        </CardHeader>
        <CardContent>
      
    <form onSubmit={handleSubmit(changePassword)} className='flex flex-col justify-center'>
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
        <p className='text-sm p-2'>We’ll send a verification code to this email or phone number if it matches an existing  CampusMedia account.</p>
        <Button
        type="submit"
        className="  w-full">
          next
        </Button>
    </form>
    </CardContent>
    </Card>
  )
}

export default ForgotPassword
