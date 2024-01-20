'use strict'
const { Model } = require('sequelize')
const Image = require('./image.model')
const MODEL_NAME = 'Product';
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Image, { as: 'images' })
            Product.hasMany(models.Video)
            Product.hasMany(models.Category, { foreignKey: 'categoryId' })
            Product.hasOne(models.Inventory)
            Product.belongsToMany(models.Cart, { through: models.CartProducts })
            Product.belongsToMany(models.User, { through: models.Review })
            Product.belongsToMany(models.User, { through: models.Order })
        }
    }
    Product.init(
        {
            product_name: {
                type: DataTypes.STRING,
                indexes: [
                    {
                        name: 'product_name_index',
                        fields: ['product_name'],
                    },
                ],
            },
            product_des: DataTypes.STRING,
            product_color: DataTypes.STRING,
            product_price: DataTypes.DOUBLE,
            product_thumbnail: DataTypes.STRING,
            product_material: DataTypes.STRING,
            product_measure: DataTypes.STRING,
            product_type: DataTypes.STRING,
            categoryId: DataTypes.STRING,
            product_state: { type: DataTypes.ENUM(['publish', 'private']), defaultValue: 'private' }
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Product
}