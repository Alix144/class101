import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find()
    }catch(err){
        return console.log(err)
    }

    if(!users){
        return res.status(404).json({message: "No users Found"})
    }

    return res.status(200).json({users})
}

export const getUser = async(req, res, next) => {
    const userId = req.params.id;
    let user;
    try{
        user = await User.findById(userId)
    }catch(err){
        return console.log(err)
    }

    if(!user){
        return res.status(404).json({message: "No user Found"})
    }

    return res.status(200).json({user})
}

export const signup = async(req, res, next) => {
    const {name, surname, email, password, description, teachingClasses, learningClasses} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email})
        
    }catch(err){
        return console.log(err + "there was an error")
    }

    if(existingUser){
        return res.status(400).json({message: "User Already Exists!"})
    }

    const hashedPassword = bcrypt.hashSync(password);
    

    const user= new User({
        name,
        surname,
        email,
        password: hashedPassword,
        description,
        teachingClasses,
        learningClasses,
    })

    try{
        await user.save()
    }catch(err){
        console.log(err +" error while signing up maaan")
        return res.status(400).json({message: err})
    }

    return res.status(201).json({user})
}

export const login = async(req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email})

    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
        return res.status(404).json({message: "User Does Not Exist!"})
    }

    const isPassCorrect = bcrypt.compareSync(password,  existingUser.password)

    if(!isPassCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successfull", user: existingUser})
}

export const updateUser = async(req, res, next) => {
    const {userId, name, surname, email, description} = req.body;

    let user;
    try{
        user = await User.findByIdAndUpdate(userId,{
            name,
            surname, 
            email,
            description, 
        })
    }catch(err){
        return console.log(err)
    }

    if(!user){
        return res.status(500).json({message: "Unable To Update User"})
    }

    return res.status(200).json({user})
}