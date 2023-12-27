import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
// import userRouter from "./routes/user-route.js";
import { config } from 'dotenv';
config();

const PORT = process.env.PORT;
const app = express();

// app.use(cors({
//     origin: ["http://localhost:4000/"],
//     methods: ["POST", "GET", "PUT", "DELETE"]
// }))

app.use(cors());

app.use(express.json())

// app.use("/user", userRouter)

app.get("/", (req, res)=>{
    res.send("messaghaha")
})


// mongoose.connect(process.env.MONGO_URI)
// .then(() => app.listen(port, () => {
//     console.log("Live on port " + port)
// })).catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log("Live on port " + PORT)
})