// Express
const express = require('express');
const app = express();

// Video Server Imports and Constants
const http = require('http')
const server = http.createServer(app)
const io = require("socket.io")(server);

// Video chat routes
const index = require('./routes/api/chat')
app.use(index)

// Video chat port listening
let interval;
io.on('connection', socket => {
  console.log('New Client Connected');


  socket.on('peerAssigned', () => {

  })

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
    clearInterval(interval)
  })
  
  socket.on('sendChatMessage', msg => {
    console.log('New Chat Message')
    return io.emit('receiveChatMessage', msg)
  })
  
  socket.on("callUser", (data) => {
    console.log('Trying user for coolr request')
    io.to(data.userToCall).emit("coolr!", {
      signal: data.stream,
      from: data.from,
    });
  });

})


// Database Setup
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

// Models
const User = require('./models/User')
const Org = require('./models/Org')


// Passport / User Auth
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

const users =  require('./routes/api/users');
const orgs = require('./routes/api/orgs');

app.use("/api/users", users)
app.use("/api/orgs", orgs)


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

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is up and running on ${port}`));