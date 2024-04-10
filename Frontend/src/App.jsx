// import { useState } from 'react'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addExperience, login, logout } from "./Store/AuthSlice";

function App() {
const dispatch = useDispatch();
const [loading,setloading] = useState(true)
const userdata = useSelector((state)=>state.Auth.user)
console.log("fetching exprience array",userdata?.email);

// const Experience = userid.Experience
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
      // .then(()=>{
      //   axios.get("http://localhost:4000/api/v1/users/get-exprience",{withCredentials:true})
      //    .then((res) => {
      //     console.log("fetching exprience array in get-exp",res.data.data);
      //          dispatch(addExperience(res.data.data) ) 
      //    }).catch((err) => {
      //      console.log("there is issue in getting exprencence array ",err);
         
      //    })
       
      // })
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
