import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({

      name: {
        type: String,
        required: true
      },
      surname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      color: {
        type: String,
        default: "#74BCFF"
      },
      classes: [{
        type: mongoose.Types.ObjectId,
        ref:"Class",
      }],
      tasks: [{
        type: mongoose.Types.ObjectId,
        ref:"Task",
      }]
})

export default mongoose.model("User", userSchema)