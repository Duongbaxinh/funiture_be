'use strict'
const { Model } = require('sequelize')
const MODEL_NAME = 'Video'
module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
        static associate(models) {
            Video.belongsTo(models.Product, { foreignKey: 'productId' })
        }
    }
    Video.init(
        {
            productId: DataTypes.STRING,
            video: DataTypes.STRING
        },
        {
            sequelize,
            modelName: MODEL_NAME
        }
    );
    return Video
}