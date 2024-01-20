'use strict';
const { UUIDV4 } = require('sequelize');
const { uuid } = require('uuidv4')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Products', 'product_color', {
            type: Sequelize.STRING
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Products',
            'product_color');
    }
};