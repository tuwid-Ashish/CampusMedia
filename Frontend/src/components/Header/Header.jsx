import React from 'react'
import media from '../../assets/mediaicon.png'
import { useSelector } from "react-redux";
import { Link,useNavigate} from 'react-router-dom';
// import Profile from '../../appwrite/Profile';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Navbar } from 'flowbite-react';
function Header() {
  const [profile,setProfile] = useState(null)
  const userData =  useSelector((state)=> state.Auth.userdata)
  useEffect(()=>{
    if(userData){
    Profile.getProfile(userData.name).then((pro)=>{
    if(pro){
      setProfile(pro)
    }
  })}
},[userData]) 
  console.log("profile image id:", profile);
  const Status =  useSelector((state)=> state.Auth.status)
 
  //  console.log(Status);
   const navigator = useNavigate()
  const navItem = [
    {
      name: "Home",
      Url: "/",
      active: true
    },
    {
      name: "Login",
      Url: "/login",
      active: !Status
    },
    {
      name: "Signup",
      Url: "/signup",
      active: !Status
    },
    {
      name: "All Posts",
      Url: "/all-posts",
      active: Status
    },
    
    {
      name: "Add Post",
      Url: "/add-post",
      active: Status
    },
    
  ]
  return (
    <header className="m-4">
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Campus  Media</span>
        <img src={media} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button >Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
        {/* <nav className ="flex" >
          <div className='mr-4'>
          <Link to="/">
             CampusMedia
          </Link>      
          </div>
          <ul className='flex ml-auto'>
            {navItem.map((item)=>
            item.active?(
              <li key={item.name}>
                <button
                onClick={()=> navigator(item.Url)}
                className='inline-block px-6 py-2 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ):null
            )}
            {Status&& (
              <li>
                {/* <ProfileIcon profile={profile}/> */}
                ProfileIcon
                {/* <Dialogform/> */}
              {/* </li>
            )}
          </ul>
        </nav> */} */
       

    </header>
  )
}

export default Header
