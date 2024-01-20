const { SuccessResponse } = require('../core/success.response')
const orderService = require('../services/order.service')
class OrderController {
    createOrder = async (req, res) => {
        new SuccessResponse({
            message: 'ordered successfully!',
            metadata: await orderService.createOrder({ ...req.body, userId: req.user.id })
        }).send(res)
    }
    createOrderCart = async (req, res) => {
        console.log(req.body)
        new SuccessResponse({
            message: 'order successfully!',
            metadata: await orderService.createOrderCart({ ...req.body, userId: req.user.id })
        }).send(res)
    }
}
module.exports = new OrderController