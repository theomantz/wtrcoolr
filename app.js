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

const debug = (c) => {
  if(process.env.NODE_ENV !== 'production') {
    console.log(c)
  }
}

io.on('connection', socket => {
  
  socket.on('handshake', msg => {
    debug('shaking hands')
    debug(`from ${msg.sendSocket} to: ${msg.targetId}`)
    io.to(msg.receiveSocket).emit('handshake', {
      sendSocket: msg.sendSocket,
      targetId: msg.targetId
    })
  })

  socket.on('disconnect', () => {
    debug('Client Disconnected');
  })
  
  socket.on("callUser", (data) => {

    io.to(data.userToCall).emit("receiveCall", {
      signalData: data.signalData,
      from: data.from,
      fromSocket: data.fromSocket
    });
  });

  socket.on('sync', data => {
    io.to(data.to).emit('sync', {
      from: data.from
    })
  })

  socket.on("acceptCall", (data) => {

    io.to(data.userToCall).emit('callAccepted', {
      signalData: data.signalData,
      from: data.from
    }) 
  })

  socket.on("callEnded", data => {
    io.to(data.to).emit('callEnded')
  })

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

const cron = require('node-cron')

cron.schedule('0 0 0 * * *', function() {
  Org.find({}).then(orgs => {
      orgs.forEach((org) =>{
        let prev = (org.members.length)
        Org.findByIdAndUpdate(org.id, { $set: {"previousMembers": prev}})
          .exec()
    })
  })
})

