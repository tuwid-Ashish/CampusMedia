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
import axios from 'axios';
function Feed() {
  const userdata = useSelector((state) => state.Auth.user);
  const [posts, setPosts] = useState([])
  const [isExpanded, setIsExpanded] = useState(false);
  const [profile,setprofile] = React.useState(false)
  console.log(posts);
  const check = posts.map((post) => post.myposts)
  console.log(check);
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/posts/get-allPosts', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data)
      })
  }, [])

  const Togglesub = () => {
    axios.post(`http://localhost:4000/api/v1/connection/${profile._id}`,{}, {withCredentials:true})
    .then((res)=>{console.log(res)
        setprofile((profile)=>!profile)
    })
    .catch((err)=>{
        console.log(err)
    })
}
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

          <Button vari diabled className="rounded-full">Post
            <PaperPlaneIcon className='mx-1' />
          </Button>
        </CardContent>
      </Card>
      {posts && check.map((check, index) => (
        <Card className="w-full">
          <CardHeader className="flex pl-4 justify-start flex-row gap-2 w-full">
            <Avatar
              onClick={() => navigate(`/user/${check.author.username}`)}
              variant="outline"
              className={
                "border my-auto md:size-14 "
              }
            >
              <AvatarImage
                src={check.author?.avatar ||
                  "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col w-fit '>
              <CardTitle className="text-xl">
                { check.author?.fullname}
              </CardTitle>
              <CardDescription className="text-lg">
                { check.author?.Description.split(' ').slice(0, 10).join(' ') + '...'}
              </CardDescription>
            </div>
              {/* <Button variant="" className="w-fit self-start rounded-full" onClick={Togglesub}>{profile.isfollwed?"followed":"unfollowed"}</Button> */}
          </CardHeader>
          <CardContent key={index} className="p-0">
            <CardTitle className="px-4 text-lg">
            {isExpanded ? check?.content : check.content?.split(' ').slice(0, 8).join(' ') + '...'}
            <button onClick={() => setIsExpanded(!isExpanded)} className='text-muted-foreground'>
                  {isExpanded ? ' Less' : 'More'}
                </button>
            </CardTitle>
            {check.image?.map((img) => (
              <img
                src={img ||
                  "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                }
                alt=""
                className="aspect-[4/2] rounded-lg bg-white"
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-row gap-2 items-center justify-between w-full p-4">
            <Button className="rounded-full">Like</Button>
            <Button className="rounded-full">Comment</Button>
            <Button className="rounded-full">Share</Button>

          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Feed