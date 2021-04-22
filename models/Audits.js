const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AuditSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  auditor: {
    type: String,
    required: true,
  },
  auditorId: {
    type: String,
    required: true,
  },
  catCounts: {
    type: [],
    required: false,
  },
  total_score: {
    type: Number,
    required: true,
  },
  image: {
    type: [],
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  rectifyDate: {
    type: String,
    required: true,
  },
  comment: {
    type: [],
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  tenantID: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
});

const Audit = mongoose.model("audits", AuditSchema);
module.exports = Audit;
