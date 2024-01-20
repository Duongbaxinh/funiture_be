const { Product, Category, Image, Review, sequelize } = require('../models')
const { uuid } = require('uuidv4')
const handleFileUpload = require('../util/handleFileUpload')
const { BAD_REQUEST } = require('../util/reasonStatusCode')
const { BadRequestErr } = require('../core/err.response')
const { categories, products } = require('../../constan/data.js')
const { Op } = require('sequelize')
class ProductService {
    createProduct = async ({
        product_name,
        product_des,
        product_price,
        product_thumbnail,
        product_type,
        product_measure,
        product_material,
        categoryId,
        product_state,
        product_image }) => {
        console.log('check product_price :::', product_price)
        const newProduct = await Product.create(
            {
                id: uuid(),
                product_name,
                product_des,
                product_price,
                product_thumbnail,
                product_type,
                product_measure,
                product_material,
                categoryId,
                product_state,
                images: handleFileUpload(product_image)
            },
            { include: [{ model: Image, as: 'images' }] }
        )
        if (!newProduct) throw new BadRequestErr('create product failure!')
        return newProduct;
    }
    updateProduct = async ({
        product_id,
        product_name,
        product_des,
        product_price,
        product_thumbnail,
        product_type,
        product_measure,
        product_material,
        categoryId,
        product_state,
        product_image }) => {
        const findProductById = await Product.findOne({ where: { id: product_id }, raw: true })
        if (!findProductById) throw new BadRequestErr('not found product')
        const updateProduct = await Product.update({
            product_name,
            product_des,
            product_price,
            product_thumbnail,
            product_type,
            product_measure,
            product_material,
            categoryId,
            product_state,
            product_image,
            images: handleFileUpload(product_image)
        }, {
            include: [{ model: Image, as: 'images' }],
            where: { id: findProductById.id }
        })
        console.log(updateProduct);
        return updateProduct;

    }
    getAllProduct = async ({ limit = 9, offset = 0 }) => {
        console.log('check limit product', limit)
        const allProducts = await Product.findAll({ offset: offset, limit: Number(limit), raw: true })
        if (allProducts.length == 0) throw new BadRequestErr('not thing in table')
        return allProducts;
    }
    getDetailProduct = async (productId) => {
        console.log('check product Id', productId)
        const product = await Product.findOne({
            where: { id: productId },
            raw: true
        })
        if (!product) throw new BadRequestErr('product not found!')
        const imageProduct = await Image.findAll({ where: { productId: product.id } })
        product.images = await imageProduct.map((img) => img.url)
        // Get review of product
        const reviews = await sequelize.query(
            `SELECT
            DISTINCT
        Users.email,
        Users.avatar,
        Reviews.comment_content,
        Reviews.comment_rate,
        Reviews.createdAt
           FROM Reviews 
        LEFT JOIN Users ON Reviews.comment_user = Users.id
        WHERE Reviews.comment_product = "${product.id}"
        `
        )
        product.reviews = await reviews[0]
        return product;
    }
    getProductByType = async (productType) => {
        console.log('run atere ')
        const products = await Product.findAll({ offset: 0, limit: 9, where: { product_type: productType }, raw: true, })
        return products;
    }

    searchProduct = async (textSearch) => {
        const productSearch = await Product.findAll({ where: { product_name: { [Op.like]: `%${textSearch}%` } } })
        return productSearch;
    }
    addManyProduct = async () => {
        await Promise.all(products.map(async ({ product_name,
            product_des,
            product_price,
            product_thumbnail,
            product_type,
            product_measure,
            product_material,
            categoryId,
            product_state, product_image }) => {
            await Product.create(
                {
                    id: uuid(),
                    product_name,
                    product_des,
                    product_price,
                    product_thumbnail,
                    product_type,
                    product_measure,
                    product_material,
                    categoryId,
                    product_state,
                    images: handleFileUpload(product_image)
                },
                { include: [{ model: Image, as: 'images' }] }
            )


        }))
        return 'success'
    }
    deleteProductById = async (productId) => {
        const findProduct = await Product.findOne({ where: { id: productId } })
        if (!findProduct) throw new BadRequestErr('not found product')
        const deleteProduct = await Product.destroy({ where: { id: findProduct.id } })
        console.log(deleteProduct)
        if (deleteProduct <= 0) throw BadRequestErr('something went wrong')
        return deleteProduct;
    }
}
module.exports = new ProductService()
