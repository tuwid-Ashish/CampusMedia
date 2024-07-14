// import { useState } from 'react'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "./Store/AuthSlice";

function App() {
const dispatch = useDispatch();
const [loading,setloading] = useState(true)
const userdata = useSelector((state)=>state.Auth.user)
console.log("fetching exprience array",userdata?.email);

// const Experience = userid.Experience
useEffect(() => {
     axios
    .get(`${process.env.VITE_SERVER_URI}/users/current-user`,{withCredentials:true})
    .then((res) => {
      console.log(res);
      if(res){
         dispatch(login(res.data.data));
        }
        else{
          dispatch(logout())
        }
      })
      .catch((err) => {
        console.log(`error while fetching user ${err}`);
    }).finally(()=>setloading(false))
}, []);


  return ( !loading?
    <div className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>:null
  );
}

export default App;
