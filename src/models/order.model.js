'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'Order'
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {

        }
    }
    Order.init(
        {
            userId: DataTypes.STRING,
            productId: DataTypes.STRING,
            order_code: DataTypes.STRING,
            order_total_price: DataTypes.DOUBLE,
            order_total_discount: DataTypes.DOUBLE,
            order_state: { type: DataTypes.ENUM(['pending', 'accepted', 'arrived', 'canceled']), defaultValue: 'pending' },
            order_address: DataTypes.STRING,
            order_phone: DataTypes.STRING(15),
            order_note: DataTypes.STRING,
            order_shipping_method: DataTypes.STRING,
            order_payment: { type: DataTypes.ENUM(['card', 'payment on delivery']), defaultValue: 'payment on delivery' }
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Order
}