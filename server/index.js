import express from "express"
import {userRouter} from "./routes/usersRouter.js";
import * as dotenv from 'dotenv'
import {connect,set} from "mongoose";
import {errorHandler} from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser"
import {authRouter} from "./routes/authRouter.js";
import {postsRouter} from "./routes/postsRouter.js";
import {serve, setup} from "swagger-ui-express";
import {swaggerSpec} from "./config/swaggerSpec.js";

// process.env.SECRET_TOKEN = 9068dce0a41f2f7058ea9ddf791c622ec60a253abea9aa966f50852dcab7e3f89bdb0c01ac4e31b7bb3ee1181a4b6127e6a2e97417a651bbc0cb0a1f88265a4d


dotenv.config()
const app = express()

const port = process.env.PORT || 3000;
set("strictQuery", false);
connect(process.env.MONGO_URL) //mongodb://127.0.0.1:27017/blog-app

app.use(express.json())
app.use(cookieParser())

app.use("/docs", serve, setup(swaggerSpec))
app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})
app.use(errorHandler)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
