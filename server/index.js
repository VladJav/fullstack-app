import express from "express"
import {userRouter} from "./routes/usersRouter.js";
import * as dotenv from 'dotenv'
import {connect,set} from "mongoose";
import {errorHandler} from "./middlewares/errorHandler.js";
import cors from 'cors'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000;
set("strictQuery", false);
connect(process.env.MONGO_URL)

app.use(cors)
app.use(express.json())

app.use("/users", userRouter)

app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})