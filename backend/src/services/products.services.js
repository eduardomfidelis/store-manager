const productModel = require('../models/products.models');

const findAllproducts = async () => {
  const allProducts = await productModel.findAllproducts();
  return allProducts;
};

const findProductById = async (productId) => {
  const findProductId = await productModel.findProductById(productId);
  return findProductId;
};

const createProduct = async (name) => {
  const created = await productModel.createProduct(name);
  return created;
};
module.exports = {
  findAllproducts,
  findProductById,
  createProduct,
}; 