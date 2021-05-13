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

// if (org.members.length === 0){
//   User.findByIdAndUpdate(req.body.userId, {$set: {active: "available"}}, {new: true}).then(usr => {

//     return res.json("available")
//   })
// } else 

router.patch('/matchUsers', passport.authenticate('jwt', {session: false}), (req, res) =>{

  Org.findById(req.body.orgId, {members: 1})
    .populate({path: 'members', match: {active: "available", _id: { $not: { $eq: req.body.userId}}}})
    .then(org => {
        let length = org.members.length
        
        let index;
        if (length > 1){
          index = Math.floor(Math.random()* length-1) + 1
        } else{
          index = 0
        }
        let member = org.members[index]
        User.findByIdAndUpdate(req.body.userId, {$set: {active: "busy"}}, {new: true})
          .then(user =>{
            User.findByIdAndUpdate(member.id, {$set: {active: "busy", match: {username: user.name, interests: user.interests, nonStarters: user.nonStarters}}}).exec()
          })
        
        res.json({username: member.name, email: member.email, interests: member.interests, nonStarters: member.nonStarters} )
    })
    .catch(err => {

      User.findByIdAndUpdate(req.body.userId, {$set: {active: "available"}}, {new: true}).then((user) => {
        return res.json({email: "available"})
      })
    })
}) 

router.get('/interests/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {

  console.log(req.params.userId)
  return User.findById(req.params.userId)
    .then(user => res.json({interests: user.match.interests, username: user.username, nonStarters: user.nonStarters}))
    .catch(err => res.status(404).json({ noCurrentUser: "No Current User" }))

})

router.patch('/interests', passport.authenticate('jwt', {session: false}), (req, res) => {

  return User.findByIdAndUpdate(req.body.userId, { $set: { match: [] } })
    .then(user => res.json({success: 'success'}))
    .catch(err => res.status(404).json({ noCurrentUser: "No Current User" }))

})


router.patch('/edit', passport.authenticate('jwt', {session: false}), (req, res) =>{
  
  User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
    .populate('orgs')
    .then(user => {
      res.json(user)
    })
    .catch(err => res.status(404).json({userUpdateFailed: "Failed to update User"}))

})

router.patch('/updateOrgs', passport.authenticate('jwt', {session: false}), (req, res) => {

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
  User.findByIdAndUpdate(req.body.id, 
    {$set: {active: "offline", socket: null } }
    )
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
      const payload = { 
        id: user.id, 
        name: user.name, 
        socket: user.socket, 
        email: user.email 
      }
      
      if( user.socket ) {
        res.status(200).json(payload)
      } else {
        res.status(400).json({error: 'User has no assigned socket'})
      }
    })
    .catch(err => {
      res.status(400).json({error: 'Cannot find user'})
    })
});

router.patch('/sockets', (req, res) => {
  User.findByIdAndUpdate(req.body.user.id, 
    {$set: { socket: req.body.sendSocket }}, 
    {new: true}
    )
    .then((user) => {
      res.json({ id: user.id, name: user.name, socket: user.socket}).status(200)
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
          active: "busy"
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = {
                  id: user.id, name: user.name, 
                  email: user.email, orgs: user.orgs, 
                  active: user.active, admins: user.admins
                }
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

router.post('/demoLogin', (req, res) =>{

  User.find().or([{email:"demo@example.com"},{email:"demo3@example.com"}])
    .then(users => {

      let filtered = users.filter((demo) => {return demo.active === "offline"})
      if (filtered.length === 0){
        res.status(400).json({demo: "Sorry No Demo Account Available"})
      } else {
        let user = filtered[0]
        User.findOneAndUpdate(
          {email: user.email}, 
          {active: "busy"},
          {new: true})
        .populate('orgs')
        .then(user => {

          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            orgs: user.orgs,
            active: user.active,
            admins: user.admins,
            initiator: Boolean(filtered.length === 1),
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                succcess: true,
                token: "Bearer " + token,
              });
            }
          );
        })
        
      }
    })

})

router.get('/activeUsers', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.find({ active: true})
    .then(activeUsers => {
      res.json(activeUsers)
    })
    .catch(err => res.status(404).json({noActiveUsers: "No Active Users"}))
})

router.patch('/active', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.body.id, {active: req.body.active}, {new: true})
    .then(usr => {
      res.status(200).json({message: `current user set to ${usr.active}`})
    })
    .catch(err => {
      res.status(400).json({
        message: `problem setting current user to ${req.body.active}`, 
        err: err
      })
    })
})


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
            
            User.findByIdAndUpdate(user.id, {$set: {active: "busy"}}).exec()

            const payload = {id: user.id, name: user.name, email: user.email, orgs: user.orgs, active: user.active, admins: user.admins}
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