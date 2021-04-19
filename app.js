// Express
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// Passport / User Auth
const passport = require('passport')


// const users =  require('./routes/api/users');
// const orgs = require('./routes/api/orgs')

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

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on ${port}`));