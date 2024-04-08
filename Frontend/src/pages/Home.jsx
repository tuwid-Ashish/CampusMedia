import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loginform from "../components/AuthUser/Login";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  MessageSquareTextIcon,
  LucideVideo,
  Newspaper,
  HomeIcon,  
  Bell,
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
import AppLayout from "./AppLayout";
import Feed from "@/components/post/Feed";

function Home() {
  const status = useSelector((state) => state.Auth.status);
  const userdata = useSelector((state) => state.Auth.user?.userinfo);
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
    <AppLayout childern={<Feed/>}/>
    )}
export default Home;
