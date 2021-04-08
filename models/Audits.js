const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AuditSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  catCounts: {
    type: [],
    required: false,
  },
  profcount: {
    type: Number,
    required: false,
  },
  gc_count: {
    type: Number,
    required: false,
  },
  food_count: {
    type: Number,
    required: false,
  },
  health_count: {
    type: Number,
    required: false,
  },
  safety_count: {
    type: Number,
    required: false,
  },
  total_score: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Audit = mongoose.model("audits", AuditSchema);
module.exports = Audit;
