const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskName: { type: String, required: true },
  taskDetails: { type: String },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = task = mongoose.model("tasks", taskSchema);
