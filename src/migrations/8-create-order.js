'use strict';
const { UUIDV4 } = require('sequelize');
const { uuid } = require('uuidv4')
const TABLE_NAME = 'Orders'
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

            useId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            productId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                }
            },
            order_code: {
                type: Sequelize.STRING,
                unique: true
            },
            order_total_price: {
                type: Sequelize.DOUBLE,
            },
            order_total_discount: {
                type: Sequelize.DOUBLE,
            },
            order_state: {
                type: Sequelize.ENUM(['pending', 'accepted', 'arrived', 'canceled']),
                defaultValue: 'pending'
            },
            order_address: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'unknow'
            },
            order_phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            order_note: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            order_shipping_method: {
                type: Sequelize.STRING,
                // allowNull: false,
            },
            order_payment: {
                type: Sequelize.ENUM(['card', 'payment on delivery']),
                defaultValue: 'payment on delivery'
                // allowNull: false,
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