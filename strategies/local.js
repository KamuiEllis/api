const localStrategy = require('passport-local');
const userShema = require('../models/users');
const passport = require('passport');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    const result = await userShema.findOne({email: email});

    if(result) {
        done(null, result)
    }
})

passport.use(new localStrategy(
    async (email, password, done) => {
        try {
            userShema.findOne({email: email}).then(data => {
                bcrypt.compare(password, data.password, (err,result) => {
                    if(result) {
                        done(null, data)
                    }
                })
            })
        } catch(e) {
            done(err, false)
        } 
    }

))