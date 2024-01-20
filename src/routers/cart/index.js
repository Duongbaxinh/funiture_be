const express = require('express')
const { asyncHandler } = require('../../helper/asyncHandler')
const { authorization } = require('../../auth')
const CartController = require('../../controllers/cart.controller')
const route = express.Router()

route.delete('', asyncHandler(CartController.deleteProductCart))
route.use(authorization)
route.get('', asyncHandler(CartController.getProductCart))
route.post('', asyncHandler(CartController.createCart))
route.put('', asyncHandler(CartController.reduceProductInCart))


module.exports = route