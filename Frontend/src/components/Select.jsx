import React, { useId } from 'react'

function Select({
    label,
    className,
    options,
    ...props
},ref) {
    const id = useId();
  return (
    <div className='w-full'>
      {label && <label className='m-1 p-1 inline-block' htmlFor={id}>{label}</label>}
        <select 
         id={id}
         className={`${className}`}
         ref={ref}
         {...props}>
            {options?.map((option) => (
             <option key={option} value={option}>{option}</option>
            ))}
         </select>
    </div>
  )
}

export default Select
