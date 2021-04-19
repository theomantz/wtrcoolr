// Express
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


//models
const User = require('./models/User');

// Passport / User Auth

const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const users =  require('./routes/api/users');
const orgs = require('./routes/api/orgs')

app.use("/api/users", users)
// app.use("/api/orgs", orgs)



// Path config
const path = require('path');

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on ${port}`));