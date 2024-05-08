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

const createProduct = async (request, response) => {
  const { name } = request.body;
  console.log(name);
  // req 4 
  if (!name) return response.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return response.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  const created = await productServices.createProduct(name);
  response.status(201).json({ id: created, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletingProduct = await productServices.findProductById(id);
  if (!deletingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await productServices.deleteProducts(id);
  res.status(204).end();
};
module.exports = {
  findAllproducts,
  findProductById,
  createProduct,
  deleteProduct,
};