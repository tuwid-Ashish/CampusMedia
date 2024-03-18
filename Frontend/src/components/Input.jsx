import React, { forwardRef, useId } from 'react'

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
    <div>
        {lable&& <label className='inline-block mb-1 pl-1' htmlFor={Id}>{lable}</label>  
    }      
    <input type={type} maxLength={maxLength} className={`px-3 py-2 rounded-lg bg-white shadow-md text-black outline-none focus:bg-gray-100 duration-200 border border-gray-200  ${className}`} 
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
