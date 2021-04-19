const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgSchema = new Schema(
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

module.exports = Org = mongoose.model("Org", OrgSchema);