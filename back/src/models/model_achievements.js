const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Achievement = new Schema({
  topic: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  user: {
    type: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Topic", Achievement);
