const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const passport = require('passport');
const Org = require('../../models/Org')

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

  return User.findById(req.user.id)
    .populate('orgs')
    .then(user => res.json(user))
    .catch(err => res.status(404).json({noCurrentUser: "No Current User"}))

})


router.get('/email/:email', passport.authenticate('jwt', {session: false}), (req, res) => {


  useremail = req.params.email
  User.find({email: { $regex: useremail, $options: "i" }})
    .then(users => res.json(users))
    .catch(err => res.status(404).json({userNotFound: "User not found"}))

})

// passport.authenticate('jwt', {session: false}),

router.patch('/matchUsers', passport.authenticate('jwt', {session: false}), (req, res) =>{

  Org.findById(req.body.orgId, {members: 1})
    .populate({path: 'members', match: {active: "available", _id: { $not: { $eq: req.body.userId}}}})
    .then(org => {
        if (org.members.length === 0){
          User.findByIdAndUpdate(req.body.userId, {$set: {active: "available"}}).exec()
          res.json("available")
        } else {
          let length = org.members.length
          let index;
          if (length > 1){
            index = Math.floor(Math.random()* length-1) + 1
          } else{
            index = 0
          }
          let member = org.members[index]
          User.findByIdAndUpdate(req.body.userId, {$set: {active: "busy"}}).exec()
          User.findByIdAndUpdate(member.id, {$set: {active: "busy"}}).exec()
          res.json(member.email)
        }
    })
    .catch(err => res.status(404).json({noMatchMade: "No online users in this group!"}))
}) 



router.patch('/edit', passport.authenticate('jwt', {session: false}), (req, res) =>{
  
  User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
    .populate('orgs')
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(404).json({userUpdateFailed: "Failed to update User"}))

})

router.patch('/updateOrgs', passport.authenticate('jwt', {session: false}), (req, res) =>{

  if (req.body.add === true){
    User.findByIdAndUpdate(req.body.userId, { $addToSet: {"orgs": req.body.orgId}}, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(404).json({userUpdateFailed: "Failed to update User's Orgs"}))
  } else{
    User.findByIdAndUpdate(req.body.userId, { $pull: {"orgs": req.body.orgId}}, { new: true })
      .then(user => res.json(user))
      .catch(err => res.status(404).json({userUpdateFailed: "Failed to update User's Orgs"}))
  }

})

router.patch('/logout', (req, res) => {
  User.findByIdAndUpdate(req.body.id, {$set: {active: false, socket: null } })
    .then(user => res.json({
      user: user.id, 
      name: user.name,
      socket: user.socket, 
      email: user.email
    }))
    .catch(err => res.status(404).json({userUpdateFailed: "Failed to update User"}))
})

router.get('/sockets/:email', (req, res) => {

  const email = req.params.email
  User.findOne({ email: email })
    .then(user => {
      const payload = { user: user.id, name: user.name, socket: user.socket, email: user.email }
      if( user.socket ) {
        res.status(200).json(payload)
      } else {
        res.status(400).json({error: 'User has no assigned socket'})
      }
    })
    .catch(err => {
      res.status(400).json({error: 'Cannot find user'})
    })
}) 

router.patch('/sockets', (req, res) => {

  User.findByIdAndUpdate(req.body.user.id, {$set: { socket: req.body.sendSocket }})
    .then((user) => {
      res.json({ id: user.id, name: user.name, socket: user.socket}.status(200))
    })
    .catch(err => {
      res.status(400).json({error: 'Cannot find user'})
    })
})

router.patch('/sockets/null', (req, res) => {
  User.findByIdAndUpdate(req.body.user.id, {$set: { socket: null }})
    .then((user) => res.json(user))
    .catch(err => {
      res.status(400).json({error: 'Cannot find user'})
    })
})

router.post('/register', (req, res)=>{

  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "User already exists"
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          active: true
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {id: user.id, name: user.name, email: user.email, orgs: user.orgs, active: user.active}

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                })
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
})

//write demo login route

router.post('/login', (req, res) => {


  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email


  User.findOne({email})
    .populate('orgs')
    .then(user => {
      if (!user) {
        errors.email = "User not found"
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            
            User.findByIdAndUpdate(user.id, {$set: {active: true}})

            const payload = {id: user.id, name: user.name, email: user.email, orgs: user.orgs, active: user.active}
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) =>{
                res.json({
                  succcess: true,
                  token: 'Bearer ' + token
                })
              }
            )
            
          } else {
            errors.password = "Incorrect password";
            return res.status(400).json(errors)
          }
        })
    })
})

router.get('/activeUsers', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find({ active: true})
    .then(activeUsers => {
      res.json(activeUsers)
    })
    .catch(err => res.status(404).json({noActiveUsers: "No Active Users"}))
})


module.exports = router;