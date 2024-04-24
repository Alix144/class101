import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({

      class:{
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: true,
      },
      sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },

})

export default mongoose.model("Message", messageSchema)