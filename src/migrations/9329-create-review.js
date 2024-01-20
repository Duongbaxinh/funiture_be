'use strict';
const { UUIDV4 } = require('sequelize');
const { uuid } = require('uuidv4')
const TABLE_NAME = 'Reviews'
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

            comment_user: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            comment_product: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                }
            },
            comment_content: {
                type: Sequelize.STRING(2000),
            },
            comment_rate: {
                type: Sequelize.INTEGER,
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