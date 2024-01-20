'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'Inventory'
module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {
        static associate(models) {
            Inventory.belongsTo(models.Product, { foreignKey: 'productId' })
        }
    }
    Inventory.init(
        {
            productId: DataTypes.STRING,
            inven_stock: DataTypes.INTEGER,
            inven_location: DataTypes.STRING
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Inventory
}