const express = require('express')
const { asyncHandler } = require('../../helper/asyncHandler')
const ProductController = require('../../controllers/product.controller')
const route = express.Router()


route.post('', asyncHandler(ProductController.createProduct))
route.get('', asyncHandler(ProductController.getAllProduct))
route.put('', asyncHandler(ProductController.updateProduct))
route.delete('/:productId', asyncHandler(ProductController.deleteProduct))
route.get('/addMany', asyncHandler(ProductController.addManyProduct))
route.get('/search', asyncHandler(ProductController.searchProduct))
route.get('/detail/:productId', asyncHandler(ProductController.getDetailProduct))
route.get('/:productType', asyncHandler(ProductController.getProductByType))

module.exports = route