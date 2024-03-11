import mongoose from "mongoose";

const Schema = mongoose.Schema;

const submittedHwSchema = new Schema({
      message: {
        type: String,
      },
      file: {
        type: String,
      },
      assignment:{
        type: mongoose.Types.ObjectId,
        ref: "Assignment",
        required: true,
      },
      user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      class:{
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      grade: {
        type: Number,
        min: 0,
        max: 100
      },


})

export default mongoose.model("submittedHw", submittedHwSchema)