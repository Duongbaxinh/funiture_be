'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'Cart'
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: 'userId' })
            Cart.belongsToMany(models.Product, { through: models.CartProducts })
        }
    }
    Cart.init(
        {
            userId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Cart
}