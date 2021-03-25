const router = require("express").Router();
let Photo = require("../../models/Photo");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/add", (req, res) => {
    // console.log(req.body.image);
    const newPhoto = new Photo({
        image: req.body.image,
        date: req.body.date,
        description: req.body.description,
        location: req.body.location,
    })
    // console.log(newPhoto);
    newPhoto.save()
        .then(() => res.json('Photo added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Photo.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;