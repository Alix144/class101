import mongoose from "mongoose";

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({

      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      file: {
        type: String,
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
      deadline: {
        type: Date,
      },

})

export default mongoose.model("Assignment", assignmentSchema)