import express  from "express";
import cookieParser from "cookie-parser";
import Cors from "cors"
const app =  express()

app.use(Cors({
        origin: process.env.CORS_ORIGIN,
         credentials: true
}))
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
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

// router import
import UserRouter from "./routes/user.routes.js"
app.use("/api/v1/users",UserRouter)

export { app }
