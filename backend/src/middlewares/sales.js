const productModel = require('../models/products.models');

const productIdValidation = (request, response, next) => {
  const products = request.body;
  const isValid = products.every((product) => 'productId' in product);

  if (!isValid) {
    return response.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const quantityValidation = (request, response, next) => {
  const products = request.body;
  const isValid = products.every((product) => 'quantity' in product);

  if (!isValid) {
    return response.status(400).json({ message: '"quantity" is required' });
  }
  if (products.every((product) => product.quantity <= 0)) {
    return response.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const productIdExist = async (request, response, next) => {
  const { id } = request.params;
  const productId = await productModel.findProductById(id);

  if (!productId) {
    return response.status(404).json({ message: 'Product not found' });
  }
  next();
};

const productValidation = async (request, response, next) => {
  const products = request.body;
  const isProduct = await Promise.all(products.map(async (product) => {
    const { productId } = product;
    const IdProduct = await productModel.findProductById(productId);
    return IdProduct;
  })).then((result) => result.every((productExist) => productExist));

  if (!isProduct) {
    return response.status(404).json({ message: 'Product not found' });
  }
  next();
};
module.exports = {
  productIdValidation,
  quantityValidation,
  productValidation,
  productIdExist,

};