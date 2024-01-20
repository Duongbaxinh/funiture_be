'use strict'
const { Model, DataTypes } = require('sequelize')
const MODEL_NAME = 'Image'
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.Product, { as: 'products', foreignKey: 'productId' })
        }
    }
    Image.init(
        {
            productId: DataTypes.STRING,
            url: DataTypes.STRING
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Image
}