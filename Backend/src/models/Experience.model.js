import mongoose,{Schema,model} from "mongoose";

const ExperienceSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:string,
        required:true,
    },
    employeetype:{
        type:string,
        required:true
    },
    company_name:{
        type:Date,
        required:true
    },
    description:{
        type:string,
        required:true,
    }
},{timestamps:true})

export const Experience = model("Experience", ExperienceSchema)