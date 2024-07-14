import { ImageUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import * as React from "react"
import { add, addDays, format, set } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { Textarea } from "../ui/textarea"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { login} from "@/Store/AuthSlice"
import { Selector } from "../Select"
export function EditExperince({ children, expId }) {
    const userdata = useSelector((state) => state.Auth.user);
    const  Exprience  = useSelector((state)=>state.Auth.Experience )
    const [error, seterror] = useState("");
    const navigate = useNavigate();
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
            title: userdata.Experience?.at(expId).title || "",
            employeetype: userdata.Experience?.at(expId).employeetype || "",
            Location: userdata.Experience?.at(expId).Location || "",
            Company_name: userdata.Experience?.at(expId).company_name || "",
            Duration: userdata.Experience?.at(expId).Duration || "",
            description: userdata.Experience?.at(expId).description || "worked as a junior developer in the company and learned a lot of new things.",
        }
    });
    const onSubmit = async (data) => {
        console.log(data);
        console.log(datePickerRef.current, selectorRef.current);
        if (!expId) {
            console.log("expId not found");
            await axios.post(`${process.env.VITE_SOCKET_URI}/users/Add-Exprience`, data, { withCredentials: true })
                .then(async (res) => {
                    console.log(res.data);
                    dispatch(login(res.data))
                })
                .catch((err) => {
                    seterror("Experience not added successfully")
                    console.log(err);
                });
            seterror("")

            myDialog.current.click()
            navigate(`/user/${userdata.username}`)
        }

        await axios.patch(`${process.env.VITE_SOCKET_URI}/users/update-Exprience`, { ...data, expId })
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
                                            `${date?.from ? (
                                                date.to ?
                                                    ` ${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}` :
                                                    `${format(date.from, "LLL dd, y")}`

                                            ) : "Pick a date"
                                            }`
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
