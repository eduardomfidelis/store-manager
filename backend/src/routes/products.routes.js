const { Router } = require('express');
const productController = require('../controllers/products.controllers');

const route = Router();

route.get('/', productController.findAllproducts);
route.get('/:id', productController.findProductById);
route.post('/', productController.createProduct);

module.exports = route;