const productServices = require('../services/products.services');

const findAllproducts = async (req, res) => {
  const products = await productServices.findAllproducts();

  return res.json(products);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.findProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

module.exports = {
  findAllproducts,
  findProductById,
};