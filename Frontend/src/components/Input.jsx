import React, { forwardRef, useId } from 'react'
import { Label } from './ui/label'
import { Input as Inputcard } from './ui/input'

const Input = forwardRef(function Inputbox(
  {
    lable,
    maxLength,
    type="text",
    className='',
    ...prps

},ref) {
   const  Id = useId()
  return (
    <div className='grid gap-2'>
        {lable&& <Label htmlFor={Id}>{lable}</ Label>  
    }      
    <Inputcard type={type} maxLength={maxLength} 
    {...prps}
    ref={ref}
    />
    </div>
  )
})

export default Input



// import React from "react";
// import { forwardRef } from "react";
// import { useId } from "react";
// function Inputbox({ type = "text", label, className, ...prps }, ref) {
//   const id = useId();
//   return (
//     <>
//       <div className="w-full flex flex-col">
//         {label && (
//           <label className="m-1 p-1 inline-block" htmlFor={id}>
//             {label}
//           </label>
//         )}
//         <input 
//         type={type} 
//         id={id}
//         className={` ${className}`}
//         {...prps}
//         ref={ref}
//          />
//       </div>
//     </>
//   );
// }
// const Input = forwardRef(Inputbox);
// export default Input;
