import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import Chat from "../models/ChatModel.js";
import mongoose from "mongoose";


export const createClass = async(req, res, next) => {
    const {name, courseCode, invitationCode, description, visibility, classColor, user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This ID"})
    }

    const klass = new Class({name, courseCode, invitationCode, description, visibility, classColor, instructors: [user]})
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
    const {name, courseCode, description, visibility} = req.body;
    const classId = req.params.id;
    let klass;
    try{
        klass = await Class.findByIdAndUpdate(classId,{
            name,
            courseCode, 
            description, 
            visibility
        })
    }catch(err){
        return console.log(err)
    }

    if(!klass){
        return res.status(500).json({message: "Unable To Update The Class"})
    }

    return res.status(200).json({klass})
}

export const addBg = async (req, res, next) => {
    const {classColor} = req.body;
    const classId = req.params.id;
  
    // Check if the request contains a file
    if (req.file) {
      const file = req.file.filename;
  
      let klass;
      try {
        klass = await Class.findByIdAndUpdate(classId, {
          classColor,
          background: file,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update the class" });
      }
  
      if (!klass) {
        return res.status(500).json({ message: "Unable to update the class" });
      }
  
      return res.status(200).json({ klass });
    }
  
    // Check if the request contains a string parameter
    if (req.body.stringParam) {
      const stringParam = req.body.stringParam;
  
      let klass;
      try {
        klass = await Class.findByIdAndUpdate(classId, {
          classColor,
          background: stringParam,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update the class" });
      }
  
      if (!klass) {
        return res.status(500).json({ message: "Unable to update the class" });
      }
  
      return res.status(200).json({ klass });
    }
  
    // If neither file nor stringParam is present in the request
    return res.status(400).json({ message: "No file or string parameter provided" });
}

export const joinClass = async(req, res, next) => {
    const {invitationCode} = req.body;

    const userId = req.params.id;
    let existingUser;

    try{
        existingUser = await User.findById(userId)
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "No user Found"})
    }


    let existingClass;
    try{
        existingClass = await Class.findOneAndUpdate(
            { invitationCode: invitationCode },
            { $addToSet: { students: userId } },
            { new: true }
        )

        if(!existingClass){
            return res.status(400).json({message: "Unable to Find Class by with this invitation code"})
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            if (existingUser.classes.includes(existingClass._id)) {
                return res.status(400).json({ message: "User is already a member of this class" });
            }else{
                existingUser.classes.push(existingClass._id);
                await existingUser.save({ session });
                await session.commitTransaction();
            }
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }catch(err){
        console.log(err)
    }
    

    return res.status(200).json({existingClass})
}

export const joinPublicClass = async(req, res, next) => {
    const {userId} = req.body;

    const classId = req.params.id;
    let existingUser;

    try{
        existingUser = await User.findById(userId)
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "No user Found"})
    }


    let existingClass;
    try{
        existingClass = await Class.findOneAndUpdate(
            { _id: classId },
            { $addToSet: { students: userId } },
            { new: true }
        )

        if(!existingClass){
            return res.status(400).json({message: "Unable to Find Class by with this invitation code"})
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            if (existingUser.classes.includes(existingClass._id)) {
                return res.status(400).json({ message: "User is already a member of this class" });
            }else{
                existingUser.classes.push(existingClass._id);
                await existingUser.save({ session });
                await session.commitTransaction();
            }
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }catch(err){
        console.log(err)
    }
    

    return res.status(200).json({existingClass})
}

export const joinClassInvitationAsInstructor = async(req, res, next) => {
    const {classId} = req.body;

    const userId = req.params.id;
    let existingUser;

    try{
        existingUser = await User.findById(userId)
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "No user Found"})
    }


    let existingClass;
    try{
        existingClass = await Class.findOneAndUpdate(
            { _id: classId },
            { $addToSet: { instructors: userId } },
            { new: true }
        )

        if(!existingClass){
            return res.status(400).json({message: "Unable to Find Class by with this ID"})
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            if (existingUser.classes.includes(existingClass._id)) {
                return res.status(400).json({ message: "User is already a member of this class" });
            }else{
                existingUser.classes.push(existingClass._id);
                await existingUser.save({ session });
                await session.commitTransaction();
            }
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }catch(err){
        console.log(err)
    }
    
    return res.status(200).json({existingClass})
}

export const joinClassInvitationAsStudent = async(req, res, next) => {
    const {classId} = req.body;

    const userId = req.params.id;
    let existingUser;

    try{
        existingUser = await User.findById(userId)
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "No user Found"})
    }


    let existingClass;
    try{
        existingClass = await Class.findOneAndUpdate(
            { _id: classId },
            { $addToSet: { students: userId } },
            { new: true }
        )

        if(!existingClass){
            return res.status(400).json({message: "Unable to Find Class by with this ID"})
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            if (existingUser.classes.includes(existingClass._id)) {
                return res.status(400).json({ message: "User is already a member of this class" });
            }else{
                existingUser.classes.push(existingClass._id);
                await existingUser.save({ session });
                await session.commitTransaction();
            }
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }catch(err){
        console.log(err)
    }
    
    return res.status(200).json({existingClass})
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

export const getAllClasses = async(req, res, next) => {
    let classes;
    try{
        classes = await Class.find().populate("instructors");
    }catch(err){
        return console.log(err)
    }

    if(!classes){
        return res.status(404).json({message: "No Classes Found"})
    }

    return res.status(200).json({classes})
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
        klass = await Class.findById(id).populate("announcements").populate("students").populate("instructors").populate("posts")
    }catch(err){
        return console.log(err)
    }

    if(!klass){
        return res.status(404).json({message: "No Class Found"});
    }

    return res.status(200).json({class: klass})
}