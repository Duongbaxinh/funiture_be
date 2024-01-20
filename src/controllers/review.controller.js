const { SuccessResponse } = require("../core/success.response")
const ReviewService = require('../services/review.service')
class ReviewController {
    createReview = async (req, res) => {
        new SuccessResponse({
            message: 'create review successfully!',
            metadata: await ReviewService.createReview({ ...req.body, userId: req.user.id })
        }).send(res)
    }
    getAllReview = async (req, res) => {
        new SuccessResponse({
            message: 'get reviews successfully!',
            metadata: await ReviewService.getCommentByProductId(req.params.productId)
        }).send(res)
    }
}
module.exports = new ReviewController()