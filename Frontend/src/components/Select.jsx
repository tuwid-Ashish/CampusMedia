// import * as React from "react"

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export const Selector = React.forwardRef((
//   { options = [],
//     label,
//     ...props },
//    ref) => {
//   // return <input type="text" ref={ref}/> 
//   return (
//     <Select>
//       <SelectTrigger className="w-full">
//         <SelectValue ref={ref} placeholder={`Select a ${label}`} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup >
//           <SelectLabel>{label}</SelectLabel>
//           {options.map((option) => (
//             <SelectItem key={option} value={option}>
//               {option}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )

// })
import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

const Selector =  React.forwardRef(Select)
export {Selector
}