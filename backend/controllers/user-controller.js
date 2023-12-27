import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";


export const signup = async(req, res, next) => {
    const {name, surname, email, password, description, teachingClasses, learningClasses} = req.body;

    let existingUser;
    let existingSubject;
    try{
        existingUser = await User.findOne({email})
        if(subject){
            existingSubject = await User.findOne({subject})
        }
        
    }catch(err){
        return console.log(err + "there was an error")
    }

    if(existingUser){
        return res.status(400).json({message: "User Already Exists!"})
    }

    if(existingSubject){
        return res.status(400).json({message: "This Subject Has Already Been Taken!"})
    }

    const hashedPassword = bcrypt.hashSync(password);
    

    const user= new User({
        name,
        email,
        password: hashedPassword,
        role,
        subjects,
        subject,
    })

    try{
        await user.save()
    }catch(err){
        console.log(err +"jjjnkn")
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