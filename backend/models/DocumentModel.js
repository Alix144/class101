import mongoose from "mongoose";

const Schema = mongoose.Schema;

const documentSchema = new Schema({

      title: {
        type: String,
        required: true
      },
      file: {
        type: String,
        required: true
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

})

export default mongoose.model("document", documentSchema)