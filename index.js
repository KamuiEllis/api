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


app.use(cors());



const store = new session.MemoryStore();

app.use(session({
    secret: 'sup',
    cookie: {maxAge: 30000},
    saveUninitialized: false,
    store
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/', rootRouter)

mongoose.connect('mongodb://localhost:27017/testdb')
const db = mongoose.connection;


db.on('error', (err) => {
    console.log(err)
})


db.once('open', () => {
    console.log('Database Connection made!')
})



app.get('/', (req,res) => {
    res.send({msg:'first route call'})
})

app.post('/', (req,res) => {
    console.log(req.body)
    res.send({data:req.body})
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})


