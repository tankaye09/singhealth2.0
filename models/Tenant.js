const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TenantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
});

const User = mongoose.model("tenants", TenantSchema);
module.exports = User;
