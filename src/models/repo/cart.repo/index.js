'use strict'
const db = require('../../../models')
class CartRepo {
    findCartByUserId = async (cart_userId) => {
        const findCart = await db.Cart.findOne({ where: { userId: cart_userId }, })
        return findCart;
    }
    findProductIncart = async ({ cartId, productId }) => {
        const findProductIncart = await db.CartProducts.findOne({
            where: { cartId: cartId, productId: productId },
            attributes: ['id', 'productId', 'cartId', 'quantity']
        })
        return findProductIncart;
    }
    findProductCart = async ({ cartId, productId }) => {
        const checkProduct = await db.CartProducts.findOne({
            where: {
                productId: productId,
                cartId: cartId
            },
            attributes: ['id', 'cartId', 'productId', 'quantity']
        })
        console.log('check product in cart:::::::::::::', checkProduct)
        return checkProduct
    }
}
module.exports = new CartRepo