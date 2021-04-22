const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const passport = require('passport');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {

  return User.findById(req.user.id)
    .populate('orgs')
    .then(user => res.json(user))

})


router.get('/test', (req, res) => {

  res.json("hello world")
})

router.patch('/edit',(req, res) =>{

  User.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true })
    .then(user => res.json(user))

})

router.patch('/logout', (req, res) => {
  User.findByIdAndUpdate(req.body.id, {$set: {active: false, socket: null } })
    .then(() => res.status(200).json())
})

router.get('/sockets/:email', (req, res) => {
  const email = req.params.email
  User.findOne({ email: email })
    .then(user => {
      if( user ) {
        res.status(200).json(user)
      }
    })
}) 

router.patch('/sockets', (req, res) => {
  User.findByIdAndUpdate(req.body.user.id, {$set: { socket: req.body.socketId }})
    .then((user) => {
      const payload = {
        id: user.id,
        name: user.name,
        socket: user.socket
      }
    });
})

router.patch('/sockets/null', (req, res) => {
  User.findByIdAndUpdate(req.body.user.id, {$set: { socket: null }})
    .then((user) => res.json(user));
})

router.post('/register', (req, res)=>{

  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ name: req.body.name })
    .then(user => {
      if (user) {
        errors.name = "User already exists"
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


module.exports = router;