const mongoose = require('mongoose')
const accountsShema = require('../models/accounts');
const route = require('express')()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;



route.get('/', async (req,res) => {
    await accountsShema.find({}, (err, result) => {
        if(err) {
            res.send({msg: err})
        }

        res.send(result)
    })
})

route.post('/', async (req,res) => {


    await bcrypt.genSalt(saltRounds, async function(err, salt) {
        await bcrypt.hash(req.body.password, salt, async function(err,hash) {
            req.body.password = hash;

            await accountsShema.create(req.body, (err, result) => {
                if(err) {
                    res.send({msg:err});
                }
                res.send(result)
            })

        })
    })

   
})

route.get('/:id', async(req,res) => {
    await accountsShema.findOne({_id:req.params.id}, (err, result) => {

        if(err) {
            res.send({msg: err})
        }

        res.send(result)
    })
})

route.put('/:id', async(req,res) => {
    await accountsShema.findByIdAndUpdate(req.params.id, req.body).then((err,result) => {
        res.send(result)
    }).catch(e => {
        res.send(e)
    })
})



route.delete('/:id', async(req,res) => {
    await accountsShema.findOneAndDelete({_id:req.params.id}, (err, result) => {

        if(err) {
            res.send({msg:err})
        }

        res.send(result)
    })

});


module.exports = route

