const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const KeySchema = new Schema({
  staffkey: {
    type: String,
    required: true,
  },
});

const Staffkey = mongoose.model("keys", KeySchema);
module.exports = Staffkey;
