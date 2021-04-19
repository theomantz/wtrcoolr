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
    interests: {
      type: [{
        type: String
      }],
      validate: [validateInterestsLength, 'Interests cannot exceed 6']
    },
    nonStarters: {
      type: [{
        type: String
      }],
      validate: [validateNonStartersLength, 'Non starters cannot exceed 6']
    }
  },
  {
    timestamps: true,
  }
);

function validateInterestsLength(){
  return this.interests.length < 7
}

function validateNonStartersLength(){
  return this.nonStarters.length < 7
}

module.exports = User = mongoose.model("User", UserSchema);
