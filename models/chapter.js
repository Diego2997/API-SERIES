const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
  title: { type: String, lowercase: true, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true },
  serieOwner: { type: Schema.Types.ObjectId, ref: "Serie" },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
