const { CREATERESPOND, SuccessResponse } = require("../core/success.response")
const ProductService = require('../services/product.service')
class ProductController {
    createProduct = async (req, res) => {
        new CREATERESPOND({
            message: 'create product successfully!',
            metadata: await ProductService.createProduct(req.body)
        }).send(res)
    }
    getAllProduct = async (req, res) => {
        new SuccessResponse({
            message: 'get products successfully!',
            metadata: await ProductService.getAllProduct(req.query)
        }).send(res)
    }
    getDetailProduct = async (req, res) => {
        new SuccessResponse({
            message: 'get product successfully!',
            metadata: await ProductService.getDetailProduct(req.params.productId)
        }).send(res)
    }
    getProductByType = async (req, res) => {
        new SuccessResponse({
            message: 'get product successfully!',
            metadata: await ProductService.getProductByType(req.params.productType)
        }).send(res)
    }
    searchProduct = async (req, res) => {
        new SuccessResponse({
            message: 'search product',
            metadata: await ProductService.searchProduct(req.query.textSearch)
        }).send(res)
    }
    updateProduct = async (req, res) => {
        new SuccessResponse(
            {
                message: 'update product successfully!',
                metadata: await ProductService.updateProduct(req.body)
            }
        ).send(res)
    }
    addManyProduct = async (req, res) => {
        new SuccessResponse({
            message: 'add successfully',
            metadata: await ProductService.addManyProduct()
        }).send(res)
    }
    deleteProduct = async (req, res) => {
        new SuccessResponse({
            message: 'delete product successfully!',
            metadata: await ProductService.deleteProductById(req.params.productId)
        }).send(res)
    }
}
module.exports = new ProductController()