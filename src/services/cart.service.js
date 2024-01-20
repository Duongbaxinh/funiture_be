const CartRepo = require('../models/repo/cart.repo')
const db = require('../models')
const { uuid } = require('uuidv4')
const productRepo = require('../models/repo/product.repo')
const { BadRequestErr } = require('../core/err.response')
const { QueryTypes, where } = require('sequelize')
class CartService {
    getProductCart = async ({ userId }) => {
        const query = `
        SELECT DISTINCT
          Carts.id AS cartId,
          Products.id AS productId,
          Products.product_name,
          Products.product_des,
          Products.product_thumbnail,
          Products.product_type,
          Products.product_price,
          CartProducts.quantity
        FROM
          Carts
        LEFT JOIN
          CartProducts ON Carts.id = CartProducts.CartId
        LEFT JOIN
          Products ON CartProducts.ProductId = Products.id
        WHERE Carts.userId = "${userId}";
      `;
        const cartProduct = await db.sequelize.query(query)
        await Promise.all(cartProduct[0].map(async (product) => {
            product.images = await db.Image.findAll({
                where: { productId: product.productId },
                attributes: ['url'],
                raw: true
            }).then(data => data.map(img => img.url));
            return product;
        }));
        return cartProduct[0]
    }
    createCart = async ({ userId, cart_productId }) => {
        // find or create cart
        const [cart, cartCreated] = await db.Cart.findOrCreate({
            where: { userId: userId },
            defaults: {
                id: uuid(),
                userId: userId
            }
        })
        // check product 
        const product = await db.Product.findOne({
            where: { id: cart_productId },
            attributes: ['id', 'product_price', 'product_name'],
            raw: true
        })
        if (!product) throw new BadRequestErr('product not found!')

        // add info product in cart just created
        if (cartCreated) {
            return await db.CartProducts.create({
                cartId: cartCreated.id,
                productId: product.id,
                quantity: 1,
                totalPrice: product.product_price,
            })
        }

        if (cart) {
            // find product has had in cart
            const checkProductCart = await CartRepo.findProductCart({ cartId: cart.id, productId: product.id })

            // update quantity of product in cart
            if (checkProductCart != null) {
                await db.CartProducts.update(
                    { quantity: checkProductCart.quantity + 1 }, {
                    where: {
                        id: checkProductCart.id,
                        cartId: checkProductCart.cartId,
                        productId: checkProductCart.productId
                    }
                })
                return checkProductCart;
            }

            // add product in card
            const id = uuid();
            const cartId = cart.id;
            const productId = product.id
            const quantity = 1;
            const totalPrice = product.product_price;
            const insertQuery = `
                INSERT INTO CartProducts (id, cartId, productId, quantity, totalPrice, createdAt, updatedAt)
                VALUES (:id,:cartId, :productId, :quantity, :totalPrice, NOW(), NOW())
              `;

            return await db.sequelize.query(insertQuery, {
                replacements: {
                    id,
                    cartId,
                    productId,
                    quantity,
                    totalPrice,
                },
                type: QueryTypes.INSERT,
            });
        }
    }
    reduceProductInCart = async ({ userId, productId }) => {
        const findCartByUserId = await db.Cart.findOne({ where: { userId: userId }, raw: true })
        const findProductIncart = await CartRepo.findProductIncart({ cartId: findCartByUserId.id, productId })
        if (!findProductIncart) throw new BadRequestErr('product not in cart!')
        if (findProductIncart.quantity > 1) {

            const updateProductInCart = await db.CartProducts.update(
                { quantity: (findProductIncart.quantity - 1) }, {
                where: {
                    id: findProductIncart.id,
                    cartId: findProductIncart.cartId,
                    productId: findProductIncart.productId,
                },
            })
            return updateProductInCart[1];
        }
        return await this.removeProductInCart({
            cartId: findProductIncart.cartId,
            productId: findProductIncart.productId
        })

    }
    removeProductInCart = async ({ cartId, productId }) => {
        console.log('run at here', cartId, productId)
        const findProductIncart = await CartRepo.findProductIncart({ cartId, productId })
        if (!findProductIncart) throw new BadRequestErr('product not in cart!')
        const deleteProductInCart = await db.CartProducts.destroy({
            where: { cartId: findProductIncart.cartId, productId: findProductIncart.productId }
        })
        return deleteProductInCart;
    }
}
module.exports = new CartService()