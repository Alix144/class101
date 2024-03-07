import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./routes/user-route.js";
import taskRouter from "./routes/task-route.js";
import classRouter from "./routes/class-route.js";
import announcementRouter from "./routes/announcement-route.js";
import PostRouter from "./routes/post-route.js";
import syllabusRouter from "./routes/syllabus-route.js";
import documentRouter from "./routes/document-route.js";
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

app.use("/files", express.static("files"));
app.use("/user", userRouter)
app.use("/task", taskRouter)
app.use("/class", classRouter)
app.use("/announcement", announcementRouter)
app.use("/post", PostRouter)
app.use("/syllabus", syllabusRouter)
app.use("/document", documentRouter)


mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => {
    console.log("Live on port " + PORT)
})).catch((err) => console.log(err))