const productModel = require('../models/products.models');

const findAllproducts = async () => {
  const allProducts = await productModel.findAllproducts();
  return allProducts;
};

const findProductById = async (productId) => {
  const findProductId = await productModel.findProductById(productId);
  return findProductId;
};

module.exports = {
  findAllproducts,
  findProductById,
}; 