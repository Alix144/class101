import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";
import mongoose from "mongoose";


export const sendMessage = async(req, res, next) => {
    const {user, klass, content} = req.body;
    
    let existingUser;
    let existingClass;

    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This ID"})
    }

    try{
        existingClass = await Class.findById(klass)
    }catch(err){
        console.log(err)
    }
    
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find Class by This ID"})
    }
    
    const message = new Message({sender: user, class: klass, content})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await message.save({session})
        
        existingClass.messages.push(message)
        await existingClass.save({session})
        
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({message})
}

export const getMessages = async(req, res, next) => {
    const classId = req.params.id;

    let messages;
    let existingClass;

    try{
        existingClass = await Class.findById(classId)
    }catch(err){
        console.log(err)
    }
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find a Class by This ID"})
    }

    try{
     messages = await Message.find({ class: classId }).populate("sender");

    }catch(err){
        return res.status(400).json({err})
    }

    return res.status(200).json({messages})
}