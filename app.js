// Express
const express = require('express');
const app = express();

// Video Server Imports
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const username = require('username-generator')

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

// Models
const User = require('./models/User')

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
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



io.on('connection', socket => {

   const userid = username.generateUsername("-");
   if (!users[userid]) {
     users[userid] = socket.id;
   }
   //send back username
   socket.emit("yourID", userid);
   io.sockets.emit("allUsers", users);

   socket.on("disconnect", () => {
     delete users[userid];
   });

   socket.on("callUser", (data) => {
     io.to(users[data.userToCall]).emit("hey", {
       signal: data.signalData,
       from: data.from,
     });
   });

   socket.on("acceptCall", (data) => {
     io.to(users[data.to]).emit("callAccepted", data.signal);
   });

   socket.on("close", (data) => {
     io.to(users[data.to]).emit("close");
   });

   socket.on("rejected", (data) => {
     io.to(users[data.to]).emit("rejected");
   });
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on ${port}`));