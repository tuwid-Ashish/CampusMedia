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
export function EditDialog() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="outline" className="w-fit self-end">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[510px] h-[650px]  overflow-y-scroll  snap-center">
                <DialogHeader className={""}>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col">
                    <CardHeader className="relative px-0 pt-0 z-0">
                        <div className="relative">
                            <Button className="absolute z-10 top-1/3 left-1/2 bg-transparent text-white hover:bg-transparent hover:drop-shadow-lg w-fit   rounded-full " size="icon">
                                <label htmlFor="" className="cursor-pointer relative"><ImageUp className="size-10 text-sky-300" /></label>
                                <input type="file" className="opacity-0 relative z-[2] size-8 -left-1/2 " {...register("bannerImage")} />
                            </Button>
                            <img
                                src={
                                    "https://w7.pngwing.com/pngs/772/580/png-transparent-taobao-textured-grain-business-cool-science-and-technology-background-textured-grain-business.png"
                                }
                                alt=""
                                className="aspect-[4/2] rounded-lg bg-white"
                            />
                        </div>
                        <div className="relative">
                            <Button className="absolute z-10 top-1/3 left-6 bg-transparent text-white hover:bg-transparent hover:drop-shadow-lg w-fit   rounded-full " size="icon">
                                <label htmlFor="" className="cursor-pointer relative"><ImageUp className="size-7 text-sky-300" /></label>
                                <input type="file" className="opacity-0 relative z-[2] size-8 -left-1/2 " {...register("profileImage")} />
                            </Button>
                            <Avatar
                                onClick={() => navigator(`/user/${userdata.username}`)}
                                variant="outline"
                                className={
                                    "border size-14 lg:size-20 "
                                }
                            >
                                <AvatarImage
                                    src={
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
                                {...register("Branch", { required: true },)}
                                className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
                            />
                        </div>
                        <div className="grid gap-1 my-2">
                            <Label htmlFor="Batch">Batch</Label>
                            <Input
                                placeholder="Batch"
                                label="Batch"
                                {...register("Batch", { required: true })}
                                className={"my-2 p-2  border-black border-spacing-2 w-full rounded-lg"}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                    <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
