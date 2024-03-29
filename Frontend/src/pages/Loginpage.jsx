import Loginform from '@/components/AuthUser/Login'
import React from 'react'

function Loginpage() {
  return (
     <div className="w-full lg:grid justify-items-center lg:min-h-[400px]  xl:min-h-[600px]">
      <div className="flex items-center justify-center ">
        <div className="mx-auto grid w-[350px] ">
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
           <Loginform/>

        </div>
        </div>
        </div>
        
  )
}

export default Loginpage
