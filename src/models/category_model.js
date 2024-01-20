'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'Category'
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.belongsTo(models.Product)
        }
    }
    Category.init(
        {
            category_name: DataTypes.STRING,
            category_des: DataTypes.STRING
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Category
}