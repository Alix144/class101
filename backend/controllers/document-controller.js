import Class from "../models/ClassModel.js";
import Document from "../models/DocumentModel.js";
import mongoose from "mongoose";

export const addDocument = async(req, res, next) => {
    const {title, klass} = req.body;
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

    const document = new Document({title, file, class: klass})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await document.save({session})

        existingClass.documents.push(document)
        await existingClass.save({session})

        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err :)"})
    }

    return res.status(200).json({document})
}

export const getClassDocuments = async(req, res, next) => {
    const classId = req.params.id;
    let documents;
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
     documents = await Document.find({ class: classId });

    }catch(err){
        return res.status(400).json({err})
    }


    return res.status(200).json({documents})
}