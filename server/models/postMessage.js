import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  participant: String,
  location: String,
  units: {
    type: Number,
    default: 0,
  },
  type: String,
  points: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
