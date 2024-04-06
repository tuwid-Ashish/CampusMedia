import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const Selector = React.forwardRef(({ options=[], label, ...props }, ref)=> {
  // return <input type="text" ref={ref}/> 
  return (
     <Select>
        <SelectTrigger className="w-full">
          <SelectValue ref={ref} placeholder={`Select a ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup >
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )

})
