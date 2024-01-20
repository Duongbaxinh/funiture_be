const express = require('express')
const route = express.Router();

route.use('/access', require('./access'))
route.use('/order', require('./order'))
route.use('/product', require('./product'))
route.use('/review', require('./reviews'))
route.use('/cart', require('./cart'))
route.use('/test', require('./test'))
module.exports = route;