const { CREATERESPOND, SuccessResponse } = require('../core/success.response');
const CartService = require('../services/cart.service');
class CartController {
    createCart = async (req, res) => {
        console.log('check authorization ', req.user)
        new CREATERESPOND({
            message: 'create cart successfully',
            metadata: await CartService.createCart({ ...req.body, userId: req.user.id })
        }).send(res)
    }
    getProductCart = async (req, res) => {
        new SuccessResponse({
            message: 'get product in cart successfully!',
            metadata: await CartService.getProductCart({ userId: req.user.id })
        }).send(res)
    }
    reduceProductInCart = async (req, res) => {
        new SuccessResponse({
            message: 'update product in cart successfully!',
            metadata: await CartService.reduceProductInCart({ ...req.body, userId: req.user.id })
        }).send(res)
    }
    deleteProductCart = async (req, res) => {
        console.log('run ate kfdf', req.body)
        new SuccessResponse({
            message: 'delete product in cart successfully!',
            metadata: await CartService.removeProductInCart(req.body)
        }).send(res)
    }
}
module.exports = new CartController();