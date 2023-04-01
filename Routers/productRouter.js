const express = require('express');
const { getProduct, createProduct,updateProduct,deleteProduct} = require('../Controllers/productControler')
const auth = require('../middeware/auth')

productRouter = express.Router();

productRouter.route('/product')
    .get(getProduct)
    .post(auth,createProduct)

productRouter.route('/product/:id')
    .put(auth,updateProduct)
    .delete(auth,deleteProduct)

module.exports = productRouter
