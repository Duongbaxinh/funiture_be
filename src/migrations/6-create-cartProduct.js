'use strict';
const { UUIDV4, DataTypes } = require('sequelize');
const { uuid } = require('uuidv4')
const TABLE_NAME = 'CartProducts'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TABLE_NAME, {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuid()
            },
            cartId: {
                type: Sequelize.STRING,

            },
            productId: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            totalPrice: DataTypes.DOUBLE,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(TABLE_NAME);
    }
};