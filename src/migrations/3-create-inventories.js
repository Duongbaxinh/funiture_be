'use strict';
const { UUIDV4 } = require('sequelize');
const { uuid } = require('uuidv4')
const TABLE_NAME = 'Inventories'
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
            productId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                }
            },
            inven_stock: {
                type: Sequelize.INTEGER,
            },
            inven_location: {
                type: Sequelize.STRING,

            },
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