const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admins: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    members: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  }, {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);