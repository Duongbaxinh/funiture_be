const express = require('express')
const { asyncHandler } = require('../../helper/asyncHandler')
const ReviewController = require('../../controllers/review.controller')
const { authorization } = require('../../auth')
const route = express.Router()


route.get('/:productId', asyncHandler(ReviewController.getAllReview))
route.use(authorization)
route.post('', asyncHandler(ReviewController.createReview))

module.exports = route