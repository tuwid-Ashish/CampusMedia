import dotenv from "dotenv";
import { ConnectDB } from "./db/index.js";
import { httpserver } from "./app.js";

dotenv.config({ path: "./env" });




ConnectDB().then(()=>{
    httpserver.listen(process.env.PORT,()=>{
        console.log(`the server is listening on port ${process.env.PORT}`);
    })
    // httpserver.get("/",(req,res)=>{
    //     res.send('hello moto')
    // })
});

// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("ERROR", (error)=>{
//             console.log("ERROR :",error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log("ERROR :",error);
//         throw error
//     }
// })()
