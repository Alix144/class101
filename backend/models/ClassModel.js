import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({

      name: {
        type: String,
        required: true
      },
      courseCode: {
        type: String,
      },
      invitationCode: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
      },
      maxStudents:{
        type: Number,
      },
      classColor:{
        type: String,
        default: 'blue',
      },
      announcements:[{
        type: mongoose.Types.ObjectId,
        ref:"Announcement",
        default: [],
      }],
      posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        default: [],
      }],
      instructors:[{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
      }],
      students:[{
        type: mongoose.Types.ObjectId,
        ref:"User",
      }]
})

export default mongoose.model("Class", classSchema)