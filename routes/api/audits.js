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
    institution: req.body.institution,
  });

  newAudit
    .save()
    .then(() => res.json("Audit added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  // console.log("test");
  Audit.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((req, res) => {
  console.log("test");
  Audit.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update", function (req, res) {
  console.log(req.body._id);
  Audit.findOneAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        comment: req.body.comment,
      },
      new: true,
    }
  )
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put("/updateImage", function (req, res) {
  console.log(req.body._id);
  Audit.findOneAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        image: req.body.image,
      },
      new: true,
    }
  )
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/", function (req, res) {
  console.log(req.body._id);
  Audit.findOneAndDelete(
    { tenantID: req.body.tenantID },
  )
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
