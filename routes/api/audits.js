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
    total_score: req.body.total_score,
    image: req.body.image,
    date: req.body.date,
    comment: req.body.comment,
    location: req.body.location,
    tenantID: req.body.tenantID,
  });

  newAudit
    .save()
    .then(() => res.json("Audit added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  console.log("test");
  Audit.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update/:id", function (req, res) {
  db.collection("audits").update(
    { _id: req.body._id },
    {
      $set: {
        type: req.body.type,
        catCounts: req.body.catCounts,
        total_score: req.body.total_score,
        image: req.body.image,
        date: req.body.date,
        comment: req.body.comment,
        location: req.body.location,
        tenantID: req.body.tenantID,
      },
    }
  );
});

module.exports = router;
