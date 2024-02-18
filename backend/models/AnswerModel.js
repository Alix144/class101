import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      post:{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
      },

})

export default mongoose.model("Answer", AnswerSchema)