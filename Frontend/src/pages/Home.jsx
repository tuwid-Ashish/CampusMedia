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
import ProfileIcon from "@/components/Header/ProfileIcon";

function Home() {
  const status = useSelector((state) => state.Auth.status);
  const userdata = useSelector((state) => state.Auth.user.userinfo);
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

  if (status === false) {
    return (
      <div className="w-full py-8 m-4 text-center container">
        <div className="flex flex-wrap md:flex-row flex-col justify-between p-2">
          <div className="md:w-5/12  mx-auto">
            <h1 className="text-2xl md:text-4xl  font-bold text-start text-gray-500 md:leading-[60px]">
              Welcome to your <br />{" "}
              <span className="text-green-400 ">College Campus community</span>
            </h1>
            <div className="w-[350px]">
              <Loginform />
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="https://img.freepik.com/free-vector/happy-students-jumping-with-flat-design_23-2147907627.jpg?w=740&t=st=1711745115~exp=1711745715~hmac=b54631c6c0dee3099ad201632afd1de89b2dc9ede3e28333de251ad6889d07df"
              alt="hero imge"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-8 gap-4   flex flex-1  container md:container  m-4 fixed">
      <div className="md:w-[25%] w-fit   text-3xl block">
        <div className="p-2 m-4 hidden lg:block w-full">
          <Card className="w-[90%]">
            <CardHeader className="relative px-0 pt-0 z-0">
              <img
                src={
                  "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                }
                alt=""
                className="aspect-[4/2] rounded-lg bg-white"
              />
              <Avatar
                variant="outline"
                className={
                  "border size-14 lg:size-20 absolute z-10 left-1/3 -bottom-0"
                }
              >
                <AvatarImage
                  src={
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
              <CardDescription className="lg:text-lg text-base  m-2">
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
        <nav className="lg:hidden flex flex-col gap-4 min-h-screen shadow-md border-r-2 ">
          {navItem.map((item) =>
            item.active ? (
              <NavLink to={item.Url}>
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
            <SquareUser/>
            <h1 className="text-lg hidden md:block">profile</h1>
          </Button>
        </nav>
      </div>
      <div className="md:w-[50%] w-full bg-pink-800 text-3xl ">col2</div>
      <div className="w-[25%] bg-green-800 text-3xl hidden md:block">ghhgk</div>
    </div>
  );
}

export default Home;
