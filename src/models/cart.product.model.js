'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'CartProducts'
module.exports = (sequelize, DataTypes) => {
    class CartProducts extends Model {
        static associate(models) {
            CartProducts.belongsTo(models.Product);
            CartProducts.belongsTo(models.Cart);
        }
    }
    CartProducts.init(
        {
            cartId: DataTypes.STRING,
            productId: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            totalPrice: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return CartProducts
}