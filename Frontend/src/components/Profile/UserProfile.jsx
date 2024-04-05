import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditDialog}  from "./EditProfile";
import {
    MessageSquareTextIcon,
    LucideVideo,
    Newspaper,
    HomeIcon,
    BellDot,
    Bell,
    SquareUser,
    Search,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { EditExperince } from './Experience';
import { useNavigate } from 'react-router-dom';
import { Pen } from 'lucide-react';
function UserProfile() {
    const userdata = useSelector((state) => state.Auth.user);
    const navigate = useNavigate();
  return (
    <div className="w-full">
    <Card className="border-b-0">
        <CardHeader className="relative  px-0 py-0 z-0 text-left">
            <img
                src={userdata.coverImage ||
                    "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                }
                alt=""
                className="aspect-[4/2] rounded-lg bg-white"
            />
             
            <Avatar
                onClick={()=>navigate(`/user/${userdata.username}`)}
                variant="outline"
                className={
                    "border size-20  lg:size-32 absolute z-10 left-4 -bottom-0"
                }
            >
                <AvatarImage
                    src={userdata.avatar ||
                        "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                    }
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full mx-auto px-4 flex justify-end'>
           <EditDialog/> 
            </div>
        </CardHeader>
        <CardContent className="pt-3 px-auto">
            <CardTitle className="lg:text-xl text-lg">
                {userdata.fullname}
            </CardTitle>
            <CardDescription className="lg:text-lg text-lg ">
                {userdata.Description}
            </CardDescription>
            <span className='text-base text-muted-foreground'>{`${""} connections`}</span>
            <div className='flex justify-start py-2 gap-4'>
                <Button variant="" className="w-fit self-end rounded-full" childern={""}>Connections</Button>
                <Button variant="outline" size="lg" className="w-fit self-end rounded-full hover:border-primary " childern={""}>messages</Button>
                <Button variant="outline" size="lg" className="w-fit self-end rounded-full hover:border-primary" childern={""}>more</Button>
            </div>
        </CardContent>
    </Card>
    <Card className="my-2">
        <CardHeader>
            <CardTitle>Activity</CardTitle>
            <Separator />
        </CardHeader>
        <CardContent>
        <div className='flex justify-start py-2 gap-4'>
                <Button variant="outline" size="lg" className="w-fit self-end rounded-full hover:border-primary" childern={""}>Posts</Button>
                <Button variant="outline" size="lg" className="w-fit self-end rounded-full hover:border-primary" childern={""}>Media</Button>
        </div>
        <div className='h-fit'>
                <Button variant="outline" size="lg" className="w-full self-end rounded-full hover:border-primary" childern={""}>See all Post</Button>
        </div>
        </CardContent>
    </Card>
    <Card className="my-2">
        <CardHeader >
            <div className="flex items-cente justify-between">
            <CardTitle>Experience</CardTitle>
            <div className='flex gap-4'><EditExperince children={
                <Button variant="outline" className="w-fit self-end">Add</Button>
            }/> </div>
            </div>
            <Separator />
        </CardHeader>
        <CardContent>
           {userdata.Experience.map((exp,key)=>(
                <div key={key} className="flex justify-start gap-5">
                     <div className="flex flex-col gap-1">
                          <CardTitle className="text-xl text-muted-foreground">{exp.title}</CardTitle>
                          <CardDescription className="text-lg text-muted-foreground">{exp.Company_name}</CardDescription>
                          <CardDescription className="text-lg text-muted-foreground">{exp.Lcation}</CardDescription>
                          <CardDescription className="text-lg text-muted-foreground">{exp.Duration}</CardDescription>
                            <EditExperince key={key} children={<Pen/>}/>
                     </div>
                     <div className="flex flex-col gap-1">
                          <CardDescription className="text-lg text-muted-foreground">{exp.employeetype}</CardDescription>
                          <CardDescription className="text-lg text-muted-foreground">{exp.description}</CardDescription>
                     </div>
                </div>
              
           ))}
        </CardContent>
    </Card>
    <Card className="my-2">
        <CardHeader>
            <CardTitle>Education</CardTitle>

            <Separator />
        </CardHeader>
        <CardContent>
           <CardTitle className="text-xl text-muted-foreground">Guru Nanak Dev Engineering College</CardTitle>
           <div className='flex justify-start gap-5'>
                <span className="text-primary text-lg">{userdata.Education.Branch}</span>
                <span className="text-primary text-lg">{userdata.Education.Batch}</span>
           </div>
        </CardContent>
    </Card>
        
</div>
  )
}

export default UserProfile