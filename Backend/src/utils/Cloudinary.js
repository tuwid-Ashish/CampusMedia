import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"         
cloudinary.config({ 
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOncloudinary = async (loacalFilePath)=>{
    console.log(loacalFilePath);
    try {
        if(!loacalFilePath) return null
      const respone =  await  cloudinary.uploader.upload(loacalFilePath,{
            resource_type: "auto"
        })
        console.log(`file uploaded on cloudinary : ${respone.url}`);
        fs.unlinkSync(loacalFilePath)
        return respone
    } catch (error) {
        console.log(error);
        fs.unlinkSync(loacalFilePath)
        return null
    }
}


export {uploadOncloudinary}