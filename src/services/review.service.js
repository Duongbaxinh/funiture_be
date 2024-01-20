const { uuid } = require('uuidv4')
const { BadRequestErr } = require('../core/err.response')
const db = require('../models')
const { QueryTypes } = require('sequelize')
class ReviewService {
    createReview = async ({ productId, userId, review_rate, review_content }) => {
        const findProduct = await db.Product.findOne({ where: { id: productId }, raw: true })
        const findUser = await db.User.findOne({ where: { id: userId } })
        if (!findProduct || !findUser) throw new BadRequestErr('something went wrong')
        const insertQuery = `
        INSERT INTO Reviews (id, comment_user, comment_product, comment_content, comment_rate, createdAt, updatedAt)
        VALUES (:id,:userId, :productId, :review_content, :review_rate, NOW(), NOW())
      `;
        const id = uuid()
        const newReview = await db.sequelize.query(insertQuery, {
            replacements: {
                id,
                userId,
                productId,
                review_content,
                review_rate,
            },
            type: QueryTypes.INSERT,
        });

        if (!newReview) throw new BadRequestErr('fail review')
        return newReview
    }
    // getCommentByProductId = async (productId) => {
    //     const findProduct = await db.Product.findOne({ where: { id: productId } })
    //     if (!findProduct) throw new BadRequestErr('product not found!')
    //     const reviews = await db.Review.findAll({
    //         where: { comment_product: productId },
    //         attributes: ['id', 'comment_content'],
    //         include: [{ models: db.User }]
    //     })
    //     if (!reviews) return []
    //     else return reviews
    // }
}
module.exports = new ReviewService