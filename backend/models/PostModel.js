import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      question: {
        type: String,
        required: true
      },
      answers: [{
        type: String,
      }],
      user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      class:{
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: true,
      }

})

export default mongoose.model("Post", PostSchema)