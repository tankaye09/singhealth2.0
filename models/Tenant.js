const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TenantSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  address: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  auditor: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("tenants", TenantSchema);
module.exports = User;
