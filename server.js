const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const users = require("./routes/api/users");
const staffkey = require("./routes/api/staffkey");
const audits = require("./routes/api/audits");
const photos = require("./routes/api/photos");
const tenants = require("./routes/api/tenants");
const sendemail = require("./routes/api/sendemail");

const app = express();

// Change limit of payload
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/audits", audits);
app.use("/api/photos", photos);
app.use("/api/tenants", tenants);
app.use("/api/staffkey", staffkey);
app.use("/api/sendEmail", sendemail);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server's up and running on port ${port}!`));
