import express  from "express";
import cookieParser from "cookie-parser";
import Cors from "cors"
const app =  express()

app.use(Cors({
        origin: process.env.CORS_ORIGIN,
        // withCredentials: true,
        Credential: "include",
}))
app.use(express.json({limit:"18kb"}))
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded())

// router import
import UserRouter from "./routes/user.routes.js"
app.use("/api/v1/users",UserRouter)

export { app }
