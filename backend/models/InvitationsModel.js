import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invitationSchema = new Schema({

      from: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      to: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      class:{
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: true,
      },
      asInstructor:{
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },

})

export default mongoose.model("Invitation", invitationSchema)