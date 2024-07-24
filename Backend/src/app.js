import express  from "express";
import cookieParser from "cookie-parser";
import Cors from "cors"
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocketIO } from "./socket/index.js";

const app =  express()

const httpserver = createServer(app)

const io = new Server(httpserver,{
    pingTimeout: 60000,
        cors:{
                origin:process.env.CORS_ORIGIN,
                credentials:true
        }

})

// console.log("this is my io",io);
app.set("io",io)  // using set method to mount the `io` instance on the app to avoid usage of `global`
app.use(Cors({
        origin: process.env.CORS_ORIGIN,
         credentials: true
}))
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        console.log("this is my request run",);
        next();
    });
app.use(express.json({limit:"18kb"}))
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded())
app.get("/",(req,res)=>{
    res.send("hello moto")
})
// router import
import UserRouter from "./routes/user.routes.js"
import PostRouter from "./routes/post.routes.js"
import ConnectionRouter from "./routes/connection.routes.js"
import ChatRouter from "./routes/chat.routes.js"
import CommentRouter from "./routes/comments.routes.js"
import MessageRouter from "./routes/message.routes.js"
import LikeRouter from "./routes/likes.routes.js"
app.use("/api/v1/users",UserRouter)
app.use("/api/v1/posts",PostRouter)
app.use("/api/v1/connection",ConnectionRouter)
app.use("/api/v1/chat-app/chats",ChatRouter)
app.use("/api/v1/chat-app/messages",MessageRouter)
app.use("/api/v1/comments",CommentRouter)
app.use("/api/v1/likes",LikeRouter)
initializeSocketIO(io);
export { httpserver }
