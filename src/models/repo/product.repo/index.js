const db = require('../../../models')
class ProductRepo {
    findProductById = async (prouduct_id) => {
        const product = await db.Product.findOne({ where: { title: 'My Title' } });
        return product
    }
}
module.exports = new ProductRepo()