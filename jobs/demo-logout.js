// Required Modules
const moment = require('moment')

// Database Setup
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.log(err));

// Models
const User = require("../models/User");

const logoutDemoUsers = async () => {
  
  const cutoffDate = (Date.now() - (1000 * 3600 * 24))
  
  try {

    const inactiveDemoUsers = await User.updateMany(
      {
        email: /^demo.*example.com$/,
        updatedAt: {
          $lt: cutoffDate,
        },
        active: { $ne: 'offline' }
      },
      {active: 'offline'}
    );

    console.log(inactiveDemoUsers)
    process.exit()

  } catch (err) {

    console.log(err)
    process.exit()

  }
  
}

logoutDemoUsers()