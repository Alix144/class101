import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import mongoose from "mongoose";


export const createPost = async(req, res, next) => {
    const {question, klass, user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This ID"})
    }

    let existingClass;
    try{
        existingClass = await Class.findById(klass)
    }catch(err){
        console.log(err)
    }
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find a Class by This ID"})
    }
    
    const post = new Post({question, class: klass, user})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({session})
        
        existingClass.posts.push(post)
        await existingClass.save({session})
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({post: post})
}

export const updatePost = async(req, res, next) => {
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

}//not used till now

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
}//not used till now

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
}//not used till now 

export const getAllPosts = async(req, res, next) => {
    let posts;
    try{
        posts = await Post.find().populate('user');
    }catch(err){
        return console.log(err)
    }

    if(!posts){
        return res.status(404).json({message: "No Post Found"})
    }

    return res.status(200).json({posts})
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
}//not used