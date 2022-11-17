const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SerieSchema = new Schema({
  title: { type: String, lowercase: true, required: true },
  description: { type: String, required: true, lowercase: true },
  url: { type: String, required: true },
  category: { type: String, required: true, lowercase: true },
  userOwner: { type: Schema.Types.ObjectId, ref: "User" },
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Serie", SerieSchema);
