import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";


export const addTask = async(req, res, next) => {
    const {title, deadline, description, course, user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This ID"})
    }
    
    const task = new Task({title, deadline, description, class: course, user})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await task.save({session})
        
        existingUser.tasks.push(task)
        await existingUser.save({session})
        
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({task})
}

export const updateTask = async(req, res, next) => {
    const {title, deadline, course, description} = req.body;
    const taskId = req.params.id;
    let task;
    try{
        task = await Task.findByIdAndUpdate(taskId,{
            title,
            deadline,
            course,
            description, 
        })
    }catch(err){
        return console.log(err)
    }

    if(!task){
        return res.status(500).json({message: "Unable To Update The Blog"})
    }

    return res.status(200).json({task})

}

export const deleteTask = async(req, res, next) => {
    const id = req.params.id;
    let task;
    try{
        task = await Task.findByIdAndDelete(id).populate('user');
        await task.user.tasks.pull(task)
        await task.user.save();
    }catch(err){
        return console.log(err)
    }

    if(!task){
        return res.status(500).json({message: "Unable to Delete"});
    }

    return res.status(200).json({message: "Successfully Deleted"})
}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userTasks;
    try{
        userTasks = await User.findById(userId).populate({
            path: "tasks",
            populate: {
                path: "class",
                model: "Class"
            }
        })
    }catch(err){
        return console.log(err)
    }

    if(!userTasks){
        return res.status(404).json({message: "No task Found"})
    }

    return res.status(200).json({tasks: userTasks.tasks})
}

export const completeTask = async(req, res, next) => {
    const {isCompleted} = req.body;
    const taskId = req.params.id;
    let task;
    try{
        task = await Task.findByIdAndUpdate(taskId,{
            isCompleted
        })
    }catch(err){
        return console.log(err)
    }

    if(!task){
        return res.status(500).json({message: "Unable To Update The Blog"})
    }

    return res.status(200).json({task})

}

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let task;
    try{
        task = await Task.findById(id)
    }catch(err){
        return console.log(err)
    }

    if(!task){
        return res.status(404).json({message: "No task Found"});
    }

    return res.status(200).json({task})
}

export const getAllTasks = async(req, res, next) => {
    let tasks;
    try{
        tasks = await Task.find().populate('user');
    }catch(err){
        return console.log(err)
    }

    if(!tasks){
        return res.status(404).json({message: "No Blogs Found"})
    }

    return res.status(200).json({blogs})
}//not used till now