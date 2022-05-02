const mongoose = require('mongoose')
const botShema = require('../models/bots');
const route = require('express')()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;



route.get('/', async (req,res) => {
    await botShema.find({}, (err, result) => {
        if(err) {
            res.send({msg: err})
        }

        res.send(result)
    })
})

route.post('/', async (req,res) => {
    req.body.bought = 0;
    req.body.status = 'active';
    await botShema.create(req.body, (err, result) => {
        if(err) {
            res.send({msg:err});
        }
        res.send(result)
    })
})

route.get('/:id', async(req,res) => {
    await botShema.findOne({_id:req.params.id}, (err, result) => {

        if(err) {
            res.send({msg:err})
        }

        res.send(result)
    })
})

route.put('/:id', async(req,res) => {
    await botShema.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send(data)
    }).catch(e => {
        res.send(e)
    })
})


route.delete('/:id', async(req,res) => {
    await botShema.findOneAndDelete({_id:req.params.id}, (err, result) => {

        if(err) {
            res.send({msg:err});
        }

        res.send(result)
    })
})


module.exports = route

