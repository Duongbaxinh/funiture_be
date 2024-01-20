const express = require('express')
const { asyncHandler } = require('../../helper/asyncHandler')
const OrderController = require('../../controllers/order.controller')
const { authorization } = require('../../auth')
const route = express.Router()


route.use(authorization)
route.post('/cart', asyncHandler(OrderController.createOrderCart))
route.post('', asyncHandler(OrderController.createOrder))

module.exports = route