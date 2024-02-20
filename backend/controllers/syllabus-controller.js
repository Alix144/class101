import Class from "../models/ClassModel.js";
import Syllabus from "../models/SyllabusModel.js";
import mongoose from "mongoose";


export const addSyllabus = async(req, res, next) => {
    const {week, topics, klass} = req.body;

    let existingClass;
    try{
        existingClass = await Class.findById(klass)
    }catch(err){
        console.log(err)
    }
    if(!existingClass){
        return res.status(400).json({message: "Unable to Find a Class by This ID"})
    }
    
    const syllabus = new Syllabus({week, topics, class: klass})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await syllabus.save({session})
        
        existingClass.syllabus.push(syllabus)
        await existingClass.save({session})
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({syllabus: syllabus})
}

export const getSyllabus = async(req, res, next) => {
    let syllabus;
    try{
        syllabus = await Syllabus.find();
    }catch(err){
        return console.log(err)
    }

    if(!syllabus){
        return res.status(404).json({message: "No syllabus Found"})
    }

    return res.status(200).json({syllabus})
}
