const express = require("express");
const router = express.Router();
const Keys = require("../../models/StaffKey");

// @route GET api/staffkey
// @desc get the staff key
router.get("/", (req, res) => {
  Keys.find()
    .then((staffkey) => res.json(staffkey))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
