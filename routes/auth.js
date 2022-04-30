const mongoose = require('mongoose')
const userShema = require('../models/users');
const router = require('express')()
const passport = require('passport')

router.post('/login', passport.authenticate('local'), (req,res) => {
    res.send(200)
})

router.post('/register', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email + ' ' + password)
    res.send(200)
})

module.exports = router