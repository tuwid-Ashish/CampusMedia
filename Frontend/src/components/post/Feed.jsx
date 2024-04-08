import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PaperPlaneIcon} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {useSelector} from "react-redux"
import {Input} from '../ui/input';
import { Button } from '../ui/button';
import AddPost from './AddPost';
function Feed() {
  const userdata = useSelector((state) => state.Auth.user);
  return (
    <div className='flex justify-center mx-2 w-full'>
      <Card className="w-full p-2">
        <CardContent className="flex items-center gap-2 w-full">
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
            <AddPost children={
              <Input
              type="text"
              placeholder="Start a Post"
              className="w-full rounded-full size-10 bg-background  md:w-[200px] lg:w-[520px]"
            />
            }/> 
            
            <Button vari  diabled className="rounded-full">Post
            <PaperPlaneIcon className='mx-1'/>
            </Button>  
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

    </div>
  )
}

export default Feed