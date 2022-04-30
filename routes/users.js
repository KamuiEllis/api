const mongoose = require('mongoose')
const userShema = require('../models/users');
const route = require('express')()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;


function generateAuthToken() {
    return crypto.randomBytes(30).toString('hex');
}

route.get('/', async (req,res) => {
    await userShema.find({}, data => {
        res.send(data)
    }).catch(e => {
        res.send(e)
    })
})

route.get('/:id', async(req,res) => {
    await userShema.find({_id:req.params.id}, data => {
        res.send(data)
    }).catch(e => {
        res.send(e)
    })
})

route.put('/:id', async(req,res) => {
    await userShema.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send(data)
    }).catch(e => {
        res.send(e)
    })
})

route.post('/register', async (req,res) => {

    await bcrypt.genSalt(saltRounds, async function(err, salt) {
        await bcrypt.hash(req.body.password, salt, async function(err,hash) {
            req.body.password = hash;

            await bcrypt.hash(req.body.buyPassword, salt, function(err,hash) {
                req.body.buyPassword = hash

                userShema.create(req.body).then( data => {
                    res.send(data)
                }).catch(e => {
                    res.send(e)
                })
            })
        })
    })

    
})

route.post('/login', async (req,res) => {
    let user = req.body;

    await userShema.findOne({}, async (data) => {
        await bcrypt.compare(user.password, data.password, async function(valid) {
            if(valid == false) {
                res.send('password is incorrect')
            } else {
                let token = generateAuthToken()
                // const authTokens = {};
                // authTokens[token] = 
                res.cookie('AuthToken', token)
            }
        })
    }).catch(e => {
        res.send(e)
    })
})

route.delete('/:id', async(req,res) => {
    await userShema.findOneAndDelete({_id:req.params.id}, data => {
        res.send(data)
    }).catch(e => {
        res.send(e)
    })
})




module.exports = route

