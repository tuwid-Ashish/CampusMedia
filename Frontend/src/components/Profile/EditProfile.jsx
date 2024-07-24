

import { ImageUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import { CardHeader } from "../ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { login, logout } from "@/Store/AuthSlice"
// import { DialogClose } from "@radix-ui/react-dialog"
import { useNavigate } from "react-router-dom"
export function EditDialog() {
    const userdata = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myDialog = useRef(null);
     const [progress, setProgress] = useState(0);
    const { register, handleSubmit, setValue, getValues, control } = useForm({
        defaultValues: {
            fullname: userdata?.fullname || "",
            description: userdata?.Description || "",
            website: userdata?.website || "",
            Branch: userdata.Education?.Branch || "",
            Batch: userdata.Education?.Batch || "",
        },
    });
    const [error, seterror] = useState("");
    const onSubmit = async (data) => {
        seterror("fdgdhjd");
        const { fullname, description, website, Branch, Batch, bannerImage,  profileImage } = data;
        const fd = new FormData();
    
        if(description !==userdata.Description || website !==userdata.website){
        await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/update-profile`, { fullname, description, website, Branch, Batch }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                dispatch(login(res.data.data))
            })
            .catch((err) => {
                seterror("Profile not updated successfully")
                console.log(err);
            });
        }
        if (data.profileImage.length !== 0) {
            fd.append("profileImage", profileImage[0])
            await axios.patch(`${import.meta.env.VITE_SERVER_URI}/users/avatar`,fd , { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    dispatch(login(res.data.data))
                }).catch((err) => {
                    seterror("image not uploaded successfully")
                    console.log(err);
                })
        }
        
        if (data.bannerImage.length !== 0) {
            fd.append("bannerImage", bannerImage[0])
            await axios.patch(`${import.meta.env.VITE_SERVER_URI}/users/coverImage`, fd, { withCredentials: true })
                  
                .then((res) => {
                    console.log(res.data);
                    dispatch(login(res.data))

                })
                .catch((err) => {
                    seterror("Banner image not uploaded successfully")
                    console.log(err);
                })
        }
        navigate(`/user/${userdata.username}`)
        myDialog.current.click().seterror("");
        
        
    };

    return (
        <>
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className="w-fit self-end">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[510px] h-[620px]  overflow-y-scroll pt-0 bg-background">
                <span className="bg-blackground p-2 w-full"></span>
                <DialogHeader className={"sticky top-0 z-10 bg-background p-2"}>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col">
                    <CardHeader className="relative px-0 pt-0 z-0">
                        <div className="relative z-0">
                            <Button className="absolute z-10 top-1/3 left-1/2 bg-transparent text-white hover:bg-transparent hover:drop-shadow-lg w-fit   rounded-full " size="icon">
                                <label htmlFor="" className="cursor-pointer relative"><ImageUp className="size-10 text-sky-300" /></label>
                                <input type="file" className="opacity-0 relative z-[2] size-8 -left-1/2 " {...register("bannerImage")} />
                            </Button>
                            <img
                                src={ userdata.coverImage ||
                                    "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                                }
                                alt=""
                                className="aspect-[4/2] rounded-lg bg-white "
                            />
                        </div>
                        <div className="relative">
                            <Button className="absolute z-10 md:top-1/3 top-5 left-3 md:left-6 bg-transparent text-white hover:bg-transparent hover:drop-shadow-lg w-fit   rounded-full " size="icon">
                                <label htmlFor="" className="cursor-pointer relative"><ImageUp className="size-7 text-sky-300" /></label>
                                <input type="file" className="opacity-0 relative z-[2]   md:size-8 size-10 -left-1/2 " {...register("profileImage")} />
                            </Button>
                            <Avatar
                                onClick={() => navigator(`/user/${userdata.username}`)}
                                variant="outline"
                                className={
                                    "border size-16 lg:size-20 "
                                }
                            >
                                <AvatarImage
                                    src={ userdata.avatar ||
                                        "https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                                    }
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </CardHeader>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="fullname">Name</Label>
                        <Input
                            {...register("fullname")}

                            id="fullname"
                            type="text"
                            placeholder="Full name"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">

                        <Label htmlFor="description">Description</Label>
                        <Input
                            {...register("description")}
                            id="description"
                            type="text"

                            placeholder="Description"
                        />
                    </div>
                    <div className="my-2 flex flex-col gap-2 items-start">
                        <Label htmlFor="description">Website</Label>
                        <Input
                            {...register("website")}
                            id="Website"
                            type="text"
                            placeholder="Website"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="grid gap-1 my-2">
                            <Label htmlFor="first-name">Branch</Label>
                            <Input
                                placeholder="Branch"
                                label="Branch"
                                {...register("Branch")}
                                className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
                            />
                        </div>
                        <div className="grid gap-1 my-2">
                            <Label htmlFor="Batch">Batch</Label>
                            <Input
                                placeholder="Batch"
                                label="Batch"
                                {...register("Batch")}
                                className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
                            />
                        </div>
                    </div>
                    {error && <span className="text-red-500 float-start">{error}</span>}
                    <div className="flex justify-end w-full gap-2">
                        <DialogClose  asChild>
                            <Button ref={myDialog} variant="outline" className="w-fit self-end">Cancel</Button>    
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        </>

    )
}
