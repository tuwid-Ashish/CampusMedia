import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AddPost from './AddPost';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
function Feed() {
  const userdata = useSelector((state) => state.Auth.user);
  const [posts, setPosts] = useState([])
  const [isExpanded, setIsExpanded] = useState(false);
  const [profile,setprofile] = React.useState(false)
  const navigate = useNavigate()
  console.log(posts);
  const check = posts.map((post) => post.myposts)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URI}/posts/get-allPosts`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data)
      })
  }, [])

  return (
    <div className='flex justify-center items-center gap-3 flex-col '>
      <Card className="w-full p-2">
        <CardContent className="flex items-center gap-2 w-full">
          <Avatar
            onClick={() => navigate(`/user/${userdata.username}`)}
            variant="outline"
            className={
              "border  md:size-16 "
            }
          >
            <AvatarImage
              src={userdata.avatar ||
                "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <AddPost children={
            <Input
              type="text"
              placeholder="Start a Post"
              className="w-full rounded-full size-10 bg-background min-w-[290px]  md:w-[200px] lg:w-[520px]"
            />
          } />

          <Button diabled="true" className="rounded-full">Post
            <PaperPlaneIcon className='mx-1' />
          </Button>
        </CardContent>
      </Card>
      {posts && check.map((check, index) => (
        <Post check={check} key={index} />
      ))}
    </div>
  )
}

export default Feed