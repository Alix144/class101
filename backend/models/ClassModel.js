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
      visibility:{
        type: String,
        default: "public"
      },
      background: {
        type: String,
        default: "bg1"
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
      syllabus: [{
        type: mongoose.Types.ObjectId,
        ref: "Syllabus",
        default: [],
      }],
      documents: [{
        type: mongoose.Types.ObjectId,
        ref: "Document",
        default: [],
      }],
      assignments: [{
        type: mongoose.Types.ObjectId,
        ref: "Assignment",
        default: [],
      }],
      messages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message",
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