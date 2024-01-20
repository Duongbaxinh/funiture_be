const { uuid } = require('uuidv4');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const cartRepo = require('../models/repo/cart.repo');
class OrderService {
    createOrderCart = async (
        { cartId,
            userId,
            products,
            order_address,
            order_phone,
            order_shipping_method,
            order_payment
        }
    ) => {

        const orderComplete = {
            orderCode: `#${uuid().slice(0, 6)}`,
            date: Date.now(),
            total: 0,
            paymentMethod: order_payment
        }
        const insertQuery = `
        INSERT INTO Orders (id, useId, productId,order_code, order_total_price, order_address, order_phone, order_shipping_method, order_payment, createdAt, updatedAt)
        VALUES (:id, :userId, :productId,:order_code, :order_total_price, :order_address, :order_phone, :order_shipping_method, :order_payment, NOW(), NOW())
      `;
        await Promise.all(products.map(async (proId) => {
            const result = await db.sequelize.query(insertQuery, {
                replacements: {
                    id: uuid(),
                    userId,
                    productId: proId.productId,
                    order_code: `#${uuid().slice(0, 6)}`,
                    order_total_price: proId.product_price,
                    order_address,
                    order_phone,
                    order_shipping_method,
                    order_payment,
                },
                type: QueryTypes.INSERT,
            });
            if (result && result[1] > 0) {
                const findProductInCart = await cartRepo.findProductIncart({ cartId: proId.cartId, productId: proId.productId })
                if (findProductInCart) {
                    orderComplete.total += proId.product_price
                    await db.CartProducts.destroy({ where: { cartId: proId.cartId, productId: proId.productId } })
                }
            } else {
                return 'false'
            }
        }));
        console.log('ckdkfkjdf', orderComplete)
        return orderComplete
    }
    createOrder = async (
        { userId,
            product,
            order_address,
            order_phone,
            order_shipping_method,
            order_payment
        }
    ) => {
        const insertQuery = `
        INSERT INTO Orders (id, useId, productId, order_total_price, order_address, order_phone, order_shipping_method, order_payment, createdAt, updatedAt)
        VALUES (:id, :userId, :productId, :order_total_price, :order_address, :order_phone, :order_shipping_method, :order_payment, NOW(), NOW())
      `;
        const result = await db.sequelize.query(insertQuery, {
            replacements: {
                id: uuid(),
                userId,
                productId: product.id,
                order_total_price: product.product_price,
                order_address,
                order_phone,
                order_shipping_method,
                order_payment,
            },
            type: QueryTypes.INSERT,
        });
        return true
    }
}
module.exports = new OrderService