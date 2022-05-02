var express = require('express');
var rootRouter = express.Router();
var users = require('./users');
var auth = require('./auth');
var bots =  require('./bots');
var accounts = require('./accounts');

rootRouter.use('/users', users)
rootRouter.use('/auth', auth)
rootRouter.use('/bots', bots);
rootRouter.use('/accounts', accounts);

// rootRouter.use('/auth', auth)


module.exports = rootRouter;

