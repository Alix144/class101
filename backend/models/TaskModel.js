import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      deadline: {
        type: Date,
      },
      isCompleted:{
        type: Boolean,
        default: false,
      },
      user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      class:{ 
        type: mongoose.Types.ObjectId,
        ref: "Class",
        
      }

})

export default mongoose.model("Task", taskSchema)