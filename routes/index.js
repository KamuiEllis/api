var express = require('express');
var rootRouter = express.Router();
var users = require('./users');
var auth = require('./auth');

rootRouter.use('/users', users)
rootRouter.use('/auth', auth)

rootRouter.use('/auth', auth)


module.exports = rootRouter;

