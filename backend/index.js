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
import assignmentRouter from "./routes/assignment-route.js";
import submittedHwsRouter from "./routes/submittedHw-route.js";
import messageRouter from "./routes/message-route.js";
import invitationRouter from "./routes/invitation-route.js";
import { config } from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
const __dirname = path.resolve();
config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors())

app.use(express.json())

/***********socket.io************/
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000",
            "https://class101.onrender.com"],
        methods: ["POST", "GET", "PUT", "DELETE"]
    }
});

app.use("/files", express.static("files"));
app.use("/user", userRouter)
app.use("/task", taskRouter)
app.use("/class", classRouter)
app.use("/announcement", announcementRouter)
app.use("/post", PostRouter)
app.use("/syllabus", syllabusRouter)
app.use("/document", documentRouter)
app.use("/assignment", assignmentRouter)
app.use("/submitted", submittedHwsRouter)
app.use("/chat", messageRouter)
app.use("/invite", invitationRouter)


io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on("join_room", (room)=>{
        socket.join(room)
        console.log(`User joined room: ${room}`);
    })

    socket.on('send_message', (data) => {
        console.log("log from backend " + data)
        io.to(data.class).emit('receive_message', data);
    });

    socket.on('typing', (data) => {
        console.log("typingggggg " + data)
        io.to(data.classId).emit('typing');
    });

    socket.on('typing_stoped', (data) => {
        console.log("typingggggg stoped" + data)
        io.to(data.classId).emit('typing_stoped');
    });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => server.listen(PORT, () => {
    console.log("Live on port " + PORT)
})).catch((err) => console.log(err))