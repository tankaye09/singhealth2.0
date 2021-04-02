const express = require("express");
const router = express.Router();
const Keys = require("../../models/Tenant");

// @route GET api/tenants
// @desc get list of tenants
router.get("/", (req, res) => {
  Keys.find()
    .then((tenants) => res.json(tenants))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;