const router = require("express").Router();
let Audit = require("../../models/Audits");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/add", (req, res) => {
  console.log(req.body);
  const newAudit = new Audit({
    type: req.body.type,
    catCounts: req.body.catCounts,
    profcount: req.body.profcount,
    gc_count: req.body.gc_count,
    food_count: req.body.food_count,
    health_count: req.body.health_count,
    safety_count: req.body.safety_count,
    total_score: req.body.total_score,
    image: req.body.image,
    date: req.body.date,
    description: req.body.description,
    location: req.body.location,
  });

  newAudit
    .save()
    .then(() => res.json("Audit added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  Audit.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
