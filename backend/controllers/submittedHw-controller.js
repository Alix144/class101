import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import Assignment from "../models/AssignmentModel.js";
import SubmittedHw from "../models/SubmittedHwModel.js";
import mongoose from "mongoose";

export const submitAssignment = async(req, res, next) => {
    const {message, klass, user, assignment} = req.body;
    const file = req.file.filename;
    
    let existingClass;
    try{
        existingClass = await Class.findById(klass)
    }catch(err){
        console.log(err)
    }
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find a Class by This ID"})
    }

    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find a User by This ID"})
    }

    let existingAssignment;
    try{
        existingAssignment = await Assignment.findById(assignment)
    }catch(err){
        console.log(err)
    }
    if(!existingAssignment){
        return res.status(400).json({message: "Unable to Find a Assignment by This ID"})
    }

    const submittedHw = new SubmittedHw({message, file, class: klass, user, assignment})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await submittedHw.save({session})

        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err :)"})
    }

    return res.status(200).json({submittedHw})
}

export const gradeAssignment = async(req, res, next) => {
    const {message, klass, user, assignment, deadline} = req.body;
    const file = req.file.filename;
    
    let existingClass;
    try{
        existingClass = await Class.findById(klass)
    }catch(err){
        console.log(err)
    }
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find a Class by This ID"})
    }

    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find a User by This ID"})
    }

    let existingAssignment;
    try{
        existingAssignment = await Assignment.findById(assignment)
    }catch(err){
        console.log(err)
    }
    if(!existingAssignment){
        return res.status(400).json({message: "Unable to Find a Assignment by This ID"})
    }

    const submittedHw = new SubmittedHw({message, file, class: klass, user, assignment, deadline})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await submittedHw.save({session})

        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err :)"})
    }

    return res.status(200).json({submittedHw})
}

export const getClassSubmittedHws = async(req, res, next) => {
    const classId = req.params.id;
    let submittedHws;
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
        submittedHws = await SubmittedHw.find({ class: classId }).populate("user").populate("assignment");

    }catch(err){
        return res.status(400).json({err})
    }

    return res.status(200).json({submittedHws})
}

export const getUserSubmittedHws = async(req, res, next) => {
    const userId = req.params.id;
    let submittedHws;
    let existingUser;

    try{
        existingUser = await User.findById(userId)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find user by This ID"})
    }

    try{
        submittedHws = await SubmittedHw.find({ user: userId }).populate("assignment");

    }catch(err){
        return res.status(400).json({err})
    }

    return res.status(200).json({submittedHws})
}