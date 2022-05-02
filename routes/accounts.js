const mongoose = require('mongoose')
const accountsShema = require('../models/accounts');
const route = require('express')()
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;


function ConvertStringToHex(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
      arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + arr.join("\\u");
}

route.get('/', async (req,res) => {
    await accountsShema.find({}, (err, result) => {
        if(err) {
            res.send({msg: err})
        }

        res.send(result)
    })
})

route.post('/', async (req,res) => {

    req.body.password = ConvertStringToHex(req.body.password);

    await accountsShema.create(req.body, (err, result) => {
        if(err) {
            res.send({msg:err});
        }
        res.send(result)
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

    req.body.password = ConvertStringToHex(req.body.password);


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

