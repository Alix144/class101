import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema({

      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
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
      }
})

export default mongoose.model("Announcement", announcementSchema)