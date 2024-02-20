import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    id: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  });

const SyllabusSchema = new Schema({
      week: {
        type: Number,
        required: true
      },
      topics: [TopicSchema],
      class:{
        type: mongoose.Types.ObjectId,
        ref: "Class",
        required: true,
      }

})

export default mongoose.model("Syllabus", SyllabusSchema)