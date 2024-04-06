import React from "react";
import media from "../../assets/mediaicon.png";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
// import Profile from '../../appwrite/Profile';
import { useState } from "react";
import { useEffect } from "react";
import {} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronRightIcon,
  RowsIcon,
  TextAlignMiddleIcon,
} from "@radix-ui/react-icons";
import ProfileIcon from "./ProfileIcon";
import { ModeToggle } from "../theme/mode-toggle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

function Header() {
  // const userData = useSelector((state) => state.Auth.userdata);
  const Status = useSelector((state) => state.Auth.status);

  //  console.log(Status);
  const navigator = useNavigate();
  const navItem = [
    {
      name: "Home",
      Url: "/",
      active: true,
    },

    {
      name: "messages",
      Url: "/messages",
      active: Status,
    },

    {
      name: "Live classes",
      Url: "/live-classes",
      active: Status,
    },
    {
      name: "News",
      Url: "/academic-news",
      active: true,
    },
    {
      name: "notifications",
      Url: "/notifications",
      active: Status,
    },
    {
      name: "Login",
      Url: "/login",
      active: !Status,
    },
    {
      name: "Signup",
      Url: "/signup",
      active: !Status,
    },
  ];
  return (
    <header className="container mr-0 m-4 sm:my-4 sm:mx-auto sticky top-0 z-10 bg-background">
      <nav className="sm:p-2 pr-0 ">
        <ul className="flex justify-between items-center">
          <div className="mx-2 flex">
            <Link to="/" className="text-2xl font-semibold">
              CampusMedia
            </Link>
            <img src={media} alt="media" className="w-10 h-10" />
          </div>
          <div className="flex gap-5">
          <ul className="lg:flex hidden">
            {navItem.map((item) => {
              if (item.active) {
                return (
                  <li key={item.name} className="mx-2">
                    <Button
                      onClick={() => navigator(item.Url)}
                      variant={`${item.name == "Signup" ? "outline" : "ghost"}`}
                      className="w-full hover:border-green-500 text-lg"
                    >
                      {item.name}
                    </Button>
                  </li>
                );
              }
            })}
            {Status && (
              <li className="mx-2 my-auto">
                  <ProfileIcon /> 
              </li>
            )}
          </ul>
            <ModeToggle />
             
          </div>
          {!Status && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <RowsIcon className="mr-4 w-6 h-6 md:hidden block relative" />
                {/* <Button className={" focus-visible:outline-black  focus-visible:ring "} variant="ghost" ></Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-26">
                {navItem.map((item) => {
                  if (item.active) {
                    return (
                      <li className="list-none " key={item.name}>
                        <DropdownMenuItem
                          key={item.name}
                          onClick={() => navigator(item.Url)}
                          variant={`${
                            item.name == "Signup" ? "outline" : "ghost"
                          }`}
                        >
                          {item.name}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </li>
                    );
                  }
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
