import mongoose,{Schema,model} from "mongoose";

const ExperienceSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required:true,
    },
    employeetype:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    Duration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
     Location:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Experience = model("Experience", ExperienceSchema)