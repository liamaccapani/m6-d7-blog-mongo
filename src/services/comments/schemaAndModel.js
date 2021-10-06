import mongoose from "mongoose"

const { Schema, model } = mongoose

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true}
})

export default model("Comment", commentSchema)