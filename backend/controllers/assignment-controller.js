import Class from "../models/ClassModel.js";
import Assignment from "../models/AssignmentModel.js";
import mongoose from "mongoose";

export const addAssignment = async(req, res, next) => {
    const {title, description, klass, deadline} = req.body;
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

    const assignment = new Assignment({title, description, file, class: klass, deadline})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await assignment.save({session})

        existingClass.assignments.push(assignment)
        await existingClass.save({session})

        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err :)"})
    }

    return res.status(200).json({assignment})
}

export const getClassAssignments = async(req, res, next) => {
    const classId = req.params.id;
    let assignments;
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
     assignments = await Assignment.find({ class: classId });

    }catch(err){
        return res.status(400).json({err})
    }

    return res.status(200).json({assignments})
}

export const getById = async(req, res, next) => {
    const assignmentId = req.params.id;
    let assignment;
    try{
        assignment = await Assignment.findById(assignmentId)
    }catch(err){
        return console.log(err)
    }

    if(!assignment){
        return res.status(404).json({message: "No Assignment Found"})
    }

    return res.status(200).json({assignment})
}