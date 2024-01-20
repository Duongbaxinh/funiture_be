const { uuid } = require('uuidv4')
const db = require('../models')
module.exports = {
  testRefreshToken: async (req, res) => {
    const query = `
        SELECT
          Carts.id AS cartId,
          Products.id AS productId,
          Products.product_name,
          Products.product_des,
          Products.product_thumbnail,
          CartProducts.quantity,
          Images.id as imageId,
          Images.url
        FROM
          Carts
        JOIN
          CartProducts ON Carts.id = CartProducts.CartId
        JOIN
          Products ON CartProducts.ProductId = Products.id
        INNER JOIN
          Images ON Products.id = Images.productId
        WHERE Carts.userId = "4d09f6e0-d0da-46cd-99c9-a99c9021e664";
      `;

    const cartProduct = await db.sequelize.query(query)
    await Promise.all(cartProduct[0].map(async (product) => {
      product.images = await db.Image.findAll({ where: { productId: product.productId }, raw: true });
      return product;
    }));

    res.status(200).json({
      cartProduct: cartProduct[0]
    })
  }
}