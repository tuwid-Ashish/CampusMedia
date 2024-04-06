import { ImageUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { add, addDays, format, set } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils" 
import { CardHeader } from "../ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { DatePicker } from "../Datepicker"
import { Textarea } from "../ui/textarea"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { login, addExprience } from "@/Store/AuthSlice"
import { Selector } from "../Select"
export function EditExperince({ children, key }) {
    const userdata = useSelector((state) => state.Auth.user);
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const myDialog = useRef(null);
    const datePickerRef = useRef(null);
    const selectorRef = useRef(null);
    const [date, setDate] = React.useState({
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20)
    })

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: userdata.Experience[key]?.title || "Junior Developer",
            employeetype: userdata.Experience[key]?.employeetype || "Full Time",
            Location: userdata.Experience[key]?.location || "ludhiana,Punjab,India",
            Company_name: userdata.Experience[key]?.company_name || "Mestro Tech",
            Duration: userdata.Experience[key]?.Duration || "",
            description: userdata.Experience[key]?.description || "worked as a junior developer in the company and learned a lot of new things.",
        }
    });

    useEffect(() => {

    }, [])
    const onSubmit = async (data) => {
        console.log(data);
        console.log(datePickerRef.current, selectorRef.current);
           if(!key){
             await axios.post("http://localhost:4000/api/v1/users/Add-Exprience", data, { withCredentials: true })
                .then(async (res) => {
                    console.log(res.data);
                    dispatch(login(res.data))
                    await axios.get("http://localhost:4000/api/v1/users/get-exprience")
                    .then((res) => {
                          dispatch(addExprience(res.data) ) 
                    }).catch((err) => {
                        console.log(err);
                        seterror("Experience data not fetched successfully in redux store")
                    })
                })
                .catch((err) => {
                    seterror("Experience not added successfully")
                    console.log(err);
                });
            seterror("")  

            myDialog.current.click()  
        }

        await axios.patch("http://localhost:4000/api/v1/users/update-Exprience", { ...data, key })
            .then((res) => {
                dispatch(login(res.data))
            })
            .catch((error) => {
                seterror("Experience not updated successfully")
                console.log(error);
            })

     myDialog.current.click().seterror("") 
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[560px] h-[550px]  overflow-y-scroll  snap-center">
                <DialogHeader className={""}>
                    <DialogTitle>Edit Experience</DialogTitle>
                    <DialogDescription>
                        Make changes to your experience here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col">
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            {...register("title")}
                            id="title"
                            type="text"
                            placeholder="title"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="Employeetype">Employe Type</Label>
                        <Selector
                            ref={selectorRef}
                            label="Employe Type"
                            options={["Full Time", "Part Time", "Internship", "Contract"]}
                            className="bg-background my-2 p-2  border-black border-spacing-2 w-full rounded-lg"
                            {...register("employeetype")}
                            id="Employeetype"
                            type="text"
                            placeholder="Employeetype"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="Company_name">Company name</Label>
                        <Input
                            {...register("Company_name")}
                            id="Company_name"
                            type="text"
                            placeholder="Company_name"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="Location">Location</Label>
                        <Input
                            {...register("Location")}
                            id="Lcation"
                            type="text"
                            placeholder="Location"
                        />
                    </div>

                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="Duration">Duration</Label>
                        <div className={cn("grid gap-2")}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Input
                                        type="text"
                                        readOnly
                                        {...register("Duration")}
                                        className={cn(
                                            "w-[300px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                        value={
                                            date
                                                ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
                                                : "Select dates"
                                        }
                                    />
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            {...register("description")}
                            id="description"
                            type="text"
                            placeholder="Description"
                        />
                    </div>
                    <div className="flex justify-end w-full">
                        <DialogClose asChild>
                            <Button ref={myDialog} variant="outline" className="w-fit self-end">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
