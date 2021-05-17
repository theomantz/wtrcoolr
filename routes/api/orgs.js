const express = require("express")
const router = express.Router()
const Org = require('../../models/Org')
const passport = require('passport');
const validateOrgInput = require('../../validation/org')


router.post('/', passport.authenticate('jwt', {session: false}),
  
  (req, res) => {

  const { errors, isValid } = validateOrgInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

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


router.patch('/edit', passport.authenticate('jwt', {session: false}),  (req, res) =>{

  Org.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
    .then(org => res.json(org))

})

router.patch('/updateUsers', passport.authenticate('jwt', {session: false}), (req, res) =>{
  if (req.body.admin === true){
    if (req.body.add === true){
      Org.findByIdAndUpdate(req.body.orgId, { $addToSet: {"admins": req.body.userId, "members": req.body.userId}}, { new: true })
        .then(org => res.json(org))
        .catch(err => res.status(404).json({userUpdateFailed: "Failed to update Org"}))
    } else{
      Org.findByIdAndUpdate(req.body.orgId, { $pull: {"admins": req.body.userId}}, { new: true })
        .then(org => res.json(org))
        .catch(err => res.status(404).json({userUpdateFailed: "Failed to update Org"}))
    }
  } else {
    if (req.body.add === true){
      Org.findByIdAndUpdate(req.body.orgId, { $push: {"members": req.body.userId}}, { new: true })
        .then(org => res.json(org))
        .catch(err => res.status(404).json({userUpdateFailed: "Failed to update Org"}))
    } else {
      Org.findByIdAndUpdate(req.body.orgId, { $pull: {"members": req.body.userId, "admins": req.body.userId}}, { new: true })
        .then(org => res.json(org))
        .catch(err => res.status(404).json({userUpdateFailed: "Failed to update Org"}))
        
    }

  }

})

router.get('/orgsUsers/:orgId', (req, res) => {
  return Org.findById(req.params.orgId, {members: 1})
    .populate('members')
    .then(org => res.json(org["members"]))
    .catch(err => res.status(404).json({noOrgFound: "No Organization found"}))
})


router.get('/publicOrgs', (req, res) => {
  Org.find({public: true})
    .then(publicOrgs => {
      res.json(publicOrgs)
    })
    .catch(err => res.status(404).json({publicOrgs: "No Public Orgs found"}))
})

router.delete('/delete', (req, res) => {

  const org = Org.findbyid(req.body.id)
  db.collection.remove({_id: org._id})
    .then(deletedOrg => res.json(deletedOrg))
    .catch(err => res.status(404).json({deleteOrg: "Failed to delete Org"}))

})

module.exports = router






