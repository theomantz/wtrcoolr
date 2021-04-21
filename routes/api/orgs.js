const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const Org = require('../../models/Org')
const kets = require('../../config/keys')
const User = require("../../models/User")


router.post('/', 
  
  (req, res) => {

  //add error handling

  // const { errors, isValid } = validateRegisterInput(req.body)

  // if (!isValid) {
  //   return res.status(400).json(errors)
  // }
  Org.findOne({ name: req.body.name })
    .then(org => {

      if(org){
        errors.name = "Org with that name already exists"
        return res.status(400).json(errors)

      } else {

        // how is the current user getting passed up?
        // if User is returning null, check value type of id in database
        
        const newOrg = new Org({
          name: req.body.name,
          // coolrHours: req.body.coolrHours,
          admins: [req.body.currentUser],
          members: [req.body.currentUser],
          public: req.body.public
        })

        newOrg
          .save()
          .then( org => res.json(org))
          .catch( err =>
            console.log(err)
          )
      }
    })
})

//
// const firstAdmin = User.findById(req.body.currentUser)
//  res.status(404).json({ orgNotCreated: "Invalid Organization Details"})

router.patch('/edit',(req, res) =>{

  Org.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
    .then(org => res.json(org))

})

router.patch('/updateUsers', (req, res) =>{

  if (req.body.admin === true){
    if (req.body.add === true){
      Org.findByIdAndUpdate(req.body.orgId, { $push: {"admins": req.body.userId}}, { new: true })
        .then(org => res.json(org))
    } else{
      Org.findByIdAndUpdate(req.body.orgId, { $pull: {"admins": req.body.userId}}, { new: true })
      .then(org => res.json(org))
    }
  } else {
    if (req.body.add === true){
      Org.findByIdAndUpdate(req.body.orgId, { $push: {"members": req.body.userId}}, { new: true })
      .then(org => res.json(org))
    } else {
      Org.findByIdAndUpdate(req.body.orgId, { $pull: {"admins": req.body.userId}}, { new: true })
      .then(org => res.json(org))
    }

  }

})



//public orgs get
router.get('/publicOrgs', (req, res) => {
  Org.find({ public: true})
    .then(publicOrgs => {
      res.json(publicOrgs)
    })
})

router.delete('/delete', (req, res) => {

  const org = Org.findbyid(req.body.id)
  db.collection.remove({_id: org._id})

})

module.exports = router






