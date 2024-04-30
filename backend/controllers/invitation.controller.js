import User from "../models/UserModel.js";
import Invitation from "../models/InvitationsModel.js";
import mongoose from "mongoose";


export const inviteStudent = async(req, res, next) => {
    const {from, klass, email} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({ email })
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This email"})
    }
    
    const invitation = new Invitation({from, to: existingUser, class: klass})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await invitation.save({session})
            
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({invitation})
}

export const inviteInstructor = async(req, res, next) => {
    const {from, klass, email, asInstructor} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({ email })
    }catch(err){
        console.log(err)
    }
    
    if(!existingUser){
        return res.status(400).json({message: "Unable to Find User by This email"})
    }
    
    const invitation = new Invitation({from, to: existingUser, class: klass, asInstructor})
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await invitation.save({session})
            
        await session.commitTransaction();
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "err"})
    }
    
    return res.status(200).json({invitation})
}

export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let invitations;
    try{
        invitations = await Invitation.find({ to: userId }).populate('class').populate('from');
    }catch(err){
        return console.log(err)
    }

    if(!invitations){
        return res.status(404).json({message: "No invitations Found"})
    }

    return res.status(200).json({invitations})
}

export const deleteNotification = async(req, res, next) => {
    const invitationId = req.params.id;
    let invitation;
    try{
        invitation = await Invitation.findByIdAndDelete(invitationId);

        if(!invitation){
            return res.status(500).json({message: "invitation not found"});
        }

        return res.status(200).json({message: "Successfully Deleted"})

    }catch(err){
        return console.log(err)
    }
}
