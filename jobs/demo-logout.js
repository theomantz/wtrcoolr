// Database Setup
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.log(err));

// Models
const User = require("./models/User");

const logoutDemoUsers = async () => {

  const cutoffDate = Date.now() - 1
  
  try {

    const demoUsers = await User.updateMany({ 
      email: /^demo.*example.com$/,
    }).exec();

    const inactiveDemoUsers = allDemoUsers.filter(usr => {
      let inactiveTime = usr.updatedAt
    })

  } catch {
    console.log(err)
  }
}