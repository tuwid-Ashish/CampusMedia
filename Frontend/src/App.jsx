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
const userid = useSelector((state) => state.Auth.user)
useEffect(() => {
  axios
    .get("http://localhost:4000/api/v1/users/current-user",{withCredentials:true})
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
