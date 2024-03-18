// import { useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return(

     <div className='w-full'>
    <Header/>
    <Outlet/>
    <Footer/>
   </div>
     ) 
}

export default App
