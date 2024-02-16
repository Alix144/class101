import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";


export const createClass = async(req, res, next) => {
    const {name, courseCode, invitationCode, description, maxStudents, classColor, user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This ID"})
    }
    
    const klass = new Class({name, courseCode, invitationCode, description, maxStudents, classColor, instructors: [user]})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await klass.save({session})
        
        existingUser.classes.push(klass)
        await existingUser.save({session})
        
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({class: klass})
}

export const updateClass = async(req, res, next) => {
    const {name, courseCode, description, maxStudents} = req.body;
    const classId = req.params.id;
    let klass;
    try{
        klass = await Class.findByIdAndUpdate(classId,{
            name, 
            courseCode, 
            description, 
            maxStudents
        })
    }catch(err){
        return console.log(err)
    }

    if(!klass){
        return res.status(500).json({message: "Unable To Update The Class"})
    }

    return res.status(200).json({klass})

}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userClasses;
    try{
        userClasses = await User.findById(userId).populate("classes")
    }catch(err){
        return console.log(err)
    }

    if(!userClasses){
        return res.status(404).json({message: "No class Found"})
    }

    return res.status(200).json({classes: userClasses.classes})
}

export const deleteClass = async(req, res, next) => {
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
}//not used till now - may be implemented later



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

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let klass;
    try{
        klass = await Class.findById(id).populate("announcements").populate("students").populate("instructors")
    }catch(err){
        return console.log(err)
    }

    if(!klass){
        return res.status(404).json({message: "No Class Found"});
    }

    return res.status(200).json({class: klass})
}