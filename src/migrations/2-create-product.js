'use strict';
const { UUIDV4 } = require('sequelize');
const { uuid } = require('uuidv4')
const TABLE_NAME = 'Products'
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
            product_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product_des: {
                type: Sequelize.STRING(2000),
            },
            product_price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            },
            product_thumbnail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_material: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            product_measure: {
                type: Sequelize.STRING,
                allowNull: true
            },
            product_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            product_state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Categories',
                    key: 'id'
                }
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