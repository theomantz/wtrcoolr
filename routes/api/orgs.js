const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const Org = require('../../models/Org')
const kets = require('../../config/keys')
const User = require("../../models/User")

router.post('/create' (req, res => {

  Org.findOne({ name: req.body.name })
    .then(org => {

      if(org){
        errors.name = "Org with that name already exists"
        return res.status(400).json(errors)

      } else {

        // how is the current user getting passed up?
        // if User is returning null, check value type of id in database
        const firstAdmin = User.findbyid(req.body.currentUser)
        const newOrg = new Org({
          name: req.body.name,
          coolrHours: req.body.coolrHours,
          admins: [firstAdmin],
          members: [firstAdmin]

        })
      }
    })
}))

router.delete('/delete' (req, res => {

  org = Org.findbyid(req.body.id)
  db.collection.remove({_id: org._id})

}))


