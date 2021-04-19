const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);