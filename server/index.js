import express from "express"
import {userRouter} from "./routes/usersRouter.js";
import * as dotenv from 'dotenv'
import {connect,set} from "mongoose";
import {errorHandler} from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser"
import cors from 'cors'
import {authRouter} from "./routes/authRouter.js";
import {postsRouter} from "./routes/postsRouter.js";


dotenv.config()
const app = express()

const port = 3000;
set("strictQuery", false);
connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cookieParser())

app.user("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})