const productServices = require('../services/products.services');

const findAllproducts = async (req, res) => {
  const products = await productServices.findAllproducts();

  return res.json(products);
};

const findProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await productServices.findProductById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

module.exports = {
  findAllproducts,
  findProductById,
};