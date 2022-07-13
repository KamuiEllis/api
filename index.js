const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const user = require('./routes/users')
var app = express();
const router = express.Router();
const rootRouter = require('./routes/index')
const passport = require('passport')
const strategy = require('./strategies/local')
var cors = require('cors')
const jwt = require('jsonwebtoken');

require('dotenv').config();


app.use(cors());

const store = new session.MemoryStore();


app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', authenticate, rootRouter)

mongoose.connect('mongodb://localhost:27017/testdb')
const db = mongoose.connection;


db.on('error', (err) => {
    console.log(err)
})


db.once('open', () => {
    console.log('Database Connection made!')
})



// app.get('/', (req,res) => {
//     res.send({msg:'first route call'})
// })

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = {name: username } 

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: token});

})

function authenticate(req,res,next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if(token == null) return res.sendStatus(404);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        console.log(user);
        next();

    })
}

// app.post('/', (req,res) => {
//     console.log(req.body)
//     res.send({data:req.body})
// })

app.listen(4000, () => {
    console.log('Listening on port 4000')
})


