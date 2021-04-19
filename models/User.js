const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordDigest: {
      type: String,
      required: true,
    },
    interests: [{
      type: String
    }],
    nonStarters: [{
      type: String
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
