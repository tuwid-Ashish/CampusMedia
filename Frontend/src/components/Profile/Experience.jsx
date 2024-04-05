import { ImageUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { CardHeader } from "../ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { Select } from "../ui/select"
import { Selector } from "../Select"
import { DatePicker } from "../Datepicker"
import { Textarea } from "../ui/textarea"
import { useSelector, useDispatch } from "react-redux"
import { useRef, useState } from "react"
import axios from "axios"
import { login } from "@/Store/AuthSlice"
export function EditExperince({ children, key }) {
    const userdata = useSelector((state) => state.Auth.user);
    const [error, seterror] = useState("");
    const dispatch = useDispatch();
    const myDialog = useRef(null);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: userdata.Experience[key]?.title || "",
            employeetype: userdata.Experience[key]?.employeetype || "",
            location: userdata.Experience[key]?.location || "",
            company_name: userdata.Experience[key]?.company_name || "",
            Duration: userdata.Experience[key]?.Duration || "",
            description: userdata.Experience[key]?.description || "",
        }
    });
    const onSubmit = async (data) => {
        if (!key) {
            await axios.post("http://localhost:4000/api/v1/users/Add-Exprience", data, { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    dispatch(login(res.data))
                })
                .catch((err) => {
                    seterror("Experience not added successfully")
                    console.log(err);
                });
            seterror("")    
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
                        <Label htmlFor="Lcation">Lcation</Label>
                        <Input
                            {...register("Lcation")}
                            id="Lcation"
                            type="text"
                            placeholder="Lcation"
                        />
                    </div>

                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="Duration">Duration</Label>
                        <DatePicker
                            {...register("Duration")}
                            id="Duration"
                            type="text"
                            placeholder="Duration"
                        />
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
                    <DialogClose  asChild>
                            <Button ref={myDialog} variant="outline" className="w-fit self-end">Cancel</Button>    
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
