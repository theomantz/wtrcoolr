const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admins: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      validate: [validateNumberAdmins, "Organization must have at least one administrator"]
    },
    members: {
      type:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
    },
    coolrHours: {
      start: String,
      end: String
    },
  }, 
  {
    timestamps: true,
  }
);

function validateNumberAdmins(){
  return this.admins.length > 0
}

module.exports = Org = mongoose.model("Org", OrgSchema);