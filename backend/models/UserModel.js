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
      // classes: {

      // }
      tasks: [{
        type: mongoose.Types.ObjectId,
        ref:"Task",
        required: true
      }]
})

export default mongoose.model("User", userSchema)