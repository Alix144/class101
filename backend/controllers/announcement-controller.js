import Class from "../models/ClassModel.js";
import User from "../models/UserModel.js";
import Announcement from "../models/AnnouncementModel.js";
import mongoose from "mongoose";

export const getAllAnnouncements = async(req, res, next) => {
    let announcements;
    try{
        announcements = await Announcement.find().populate("user");
    }catch(err){
        return console.log(err)
    }

    if(!announcements){
        return res.status(404).json({message: "No Announcements Found"})
    }

    return res.status(200).json({announcements})
}

export const addAnnouncement = async(req, res, next) => {
    const {title, description, user, klass} = req.body;
    
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
    
    const announcement = new Announcement({title, description, user, class: klass})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await announcement.save({session})
        
        existingClass.announcements.push(announcement)
        await existingClass.save({session})
        
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({announcement})
}

export const updateAnnouncement = async(req, res, next) => {
    const {title, description} = req.body;
    const announcementId = req.params.id;
    let announcement;
    try{
        announcement = await Announcement.findByIdAndUpdate(announcementId,{
            title,
            description, 
        })
    }catch(err){
        return console.log(err)
    }

    if(!announcement){
        return res.status(500).json({message: "Unable To Update Announcement"})
    }

    return res.status(200).json({announcement})

}

export const deleteAnnouncement = async(req, res, next) => {
    const id = req.params.id;
    let announcement;
    try{
        announcement = await Announcement.findByIdAndDelete(id).populate('class');
        await announcement.class.announcements.pull(announcement)
        await announcement.class.save();
    }catch(err){
        return console.log(err)
    }

    if(!announcement){
        return res.status(500).json({message: "Unable to Delete"});
    }

    return res.status(200).json({message: "Successfully Deleted"})
}

export const getById = async(req, res, next) => {
    const id = req.params.id;
    let announcement;
    try{
        task = await Announcement.findById(id)
    }catch(err){
        return console.log(err)
    }

    if(!task){
        return res.status(404).json({message: "No announcement Found"});
    }

    return res.status(200).json({announcement})
}//not used till now