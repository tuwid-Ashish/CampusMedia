import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loginform from "../components/AuthUser/Login";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
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
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
function AppLayout({ childern }) {
    const status = useSelector((state) => state.Auth.status);
    const userdata = useSelector((state) => state.Auth.user);
    const navigator = useNavigate();
    const navItem = [
        {
            name: "Home",
            Url: "/",
            active: true,
            icon: <HomeIcon />,
        },

        {
            name: "messages",
            Url: "/messages",
            active: status,
            icon: <MessageSquareTextIcon />,
        },

        {
            name: "Live",
            Url: "/live-classes",
            active: status,
            icon: <LucideVideo />,
        },
        {
            name: "News",
            Url: "/academic-news",
            active: true,
            icon: <Newspaper />,
        },
        {
            name: "notifications",
            Url: "/notifications",
            active: status,
            icon: <Bell />,
        },
        {
            name: "Login",
            Url: "/login",
            active: !status,
        },
        {
            name: "Signup",
            Url: "/signup",
            active: !status,
        },
    ];
    return (
        <div className="w-full py-8 gap-4   flex flex-1  container sm:container  m-4  md:relative">
            <div className="md:w-[25%] w-fit h-fit   text-3xl block lg:static sticky  top-20">
                <div className="p-2 m-4 hidden lg:block w-full">
                    <Card className="w-[90%]">
                        <CardHeader className="relative px-0 pt-0 z-0">
                            <img
                                src={ userdata.coverImage ||
                                    "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                                }
                                alt=""
                                className="aspect-[4/2] rounded-lg bg-white"
                            />
                            <Avatar
                                onClick={()=>navigator(`/user/${userdata.username}`)}
                                variant="outline"
                                className={
                                    "border size-14 lg:size-20 absolute z-10 left-1/3 -bottom-0"
                                }
                            >
                                <AvatarImage
                                    src={ userdata.avatar ||
                                        "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                                    }
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="lg:text-xl text-lg text-center">
                                {userdata.fullname}
                            </CardTitle>
                            <CardDescription className="md:text-base text-sm  m-2">
                                {userdata.Description}
                            </CardDescription>
                            <Separator />
                        </CardContent>
                        <CardFooter className="flex justify-between ">
                            <Button variant="link">connections</Button>
                            <Button>followers</Button>
                        </CardFooter>
                    </Card>
                </div>
                <nav className="lg:hidden flex flex-col gap-4  shadow-md border-r-2 ">
                    {navItem.map((item) =>
                        item.active ? (
                            <NavLink to={item.Url} key={item.name}>
                                <div className="flex items-center gap-3 " key={item.name}>
                                    <Button
                                        variant="ghost"
                                        className="md:w-full flex items-center justify-start gap-4 p-4 rounded-2xl "
                                    >
                                        {item.icon}
                                        <h1 className="text-lg hidden md:block">{item.name}</h1>
                                    </Button>
                                </div>
                            </NavLink>
                        ) : null
                    )}
                    <Button
                        variant="ghost"
                        className="md:w-full flex items-center justify-start gap-4 p-4 rounded-2xl "
                    >
                        <SquareUser />
                        <h1 className="text-lg hidden md:block">profile</h1>
                    </Button>
                </nav>
            </div>
            <div className="md:w-[50%] w-full  text-3xl relative">
                {childern}
            </div>
            <div className="w-[25%]  text-3xl hidden md:flex flex-col justify-betwee p-3 gap-5 sticky top-20 h-fit">
                <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search"
                    className="w-full rounded-lg bg-background pl-8  "
                        placeholder="Search..." />
                </div>
                <div className="">
                    <Card>
                        <CardHeader>
                            <CardTitle className="">Top News</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center "></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default AppLayout