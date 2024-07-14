import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { useRef } from 'react'
import { Textarea } from '../ui/textarea'
import {Image} from "lucide-react"
import {useSelector} from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardDescription } from '../ui/card'
import axios from "axios"
function AddPost({ children }) {
  const { register, handleSubmit } = useForm()
  const myDialog = useRef(null);
  const [error, seterror] = useState("");
  const userdata = useSelector((state) => state.Auth.user);
  const formdata = new FormData();
  const onSubmit = async (data) => {
    formdata.delete("images")
    formdata.delete("description")
      if(!data){
        seterror("Please fill the form")
      }
      if(data.image){
        formdata.append("images", data.image[0]);
        formdata.append("description", data.description);
      }
      console.log(data.description)
      await axios.post(`${process.env.VITE_SOCKET_URI}/posts/create-post`, formdata, { withCredentials: true }).then((res) => {
          console.log(res.data);
          
      })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] h-[550px]  overflow-y-scroll  snap-center">
        <DialogHeader className={""}>
          <div className='flex  gap-2 w-full flex-row items-start '>
        <Avatar
                onClick={()=>navigate(`/user/${userdata.username}`)}
                variant="outline"
                className={
                    "border size-16 "
                }
            >
                <AvatarImage
                    src={userdata.avatar ||
                        "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                    }
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='m-1'>
            <h1 className='text-xl font-semibold uppercase'>{userdata.fullname}</h1>
            <CardDescription>what you like to share</CardDescription>
            </div>
            </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col">
          <div className="my-2 flex flex-col gap-2 items-start">
            <Textarea
              {...register("description")}
              id="description"
              type="text"
              className="border-none min-h-[350px]"
              placeholder="Write your post "
            />
          </div>
          <div className='flex gap-5 items-center'>
            <Button><Image className='relative'/> <input type="file" className='absolute z-10 opacity-0 w-10' {...register("image")} /> </Button>
          </div>
          <div className="flex justify-end w-full">
            <DialogClose asChild>
              <Button ref={myDialog} variant="outline" className="w-fit self-end">Cancel</Button>

            </DialogClose>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPost