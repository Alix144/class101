import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({

      messages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message",
        default: [],
      }],

})

export default mongoose.model("Chat", chatSchema)