import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate}  from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import axios from 'axios'
function Connection() {
    const userdata = useSelector((state) => state.Auth.user)
    const location = useLocation().pathname.replace("/user/","").replace("/connection/followers","")
    const [Connection,setConection] = useState([])
    const navigate = useNavigate()
    console.log(Connection);
     const getFollowers = ()=>{
      axios.get(`${process.env.VITE_SERVER_URI}/connection/${location}/followers`, { withCredentials: true })
      .then((res)=>{
        console.log(res.data.data);
        setConection(res.data.data)
      })
     }
    useEffect(() => {
      getFollowers()
    },[])

    const getFollowing = ()=>{
      axios.get(`${process.env.VITE_SERVER_URI}/connection/${location}/following`, { withCredentials: true })
      .then((res)=>{
        console.log(res.data.data);
        setConection(res.data.data)
      })
    }
  return (
    <Card className="">
    <div className='w-full m-2'>

        <h1 className='ml-3'>{userdata.fullname}</h1>
        <div className='flex justify-start my-2'>
          <Button variant='link' size='lg'  onClick={getFollowers} className='rounded-full hover:no-underline text-xl items-end px-4'>follower</Button>
          <Button variant='link' size='lg' onClick={getFollowing} className='rounded-full hover:no-underline text-xl items-end px-4'>following</Button>
          </div> 
          <Separator className=""/>
    {Connection?.map((userdata)=>(
        <CardHeader className="flex pl-4 justify-start flex-row gap-2 w-full">
    <Avatar
      onClick={() => navigate(`/user/${userdata.user.username}`)}
      variant="outline"
      className={
        "border my-auto size-14 md:size-20 "
      }
    >
      <AvatarImage
        src={  userdata?.user.avatar ||
          "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
        }
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
     <div className='flex flex-col w-fit '>
      <CardTitle className="text-xl">
        { userdata?.user.fullname}
      </CardTitle>
      <CardDescription className="text-lg">
        { userdata?.user.Description}
      </CardDescription>
     </div>
     <Button variant="outline" size="lg" className="w-fit ml-auto   rounded-full hover:border-primary">{userdata.followedyou?"follwing":"follower"}</Button>
    </CardHeader>
    ))}
    </div>
  </Card>
   )
}

export default Connection