const connection = require('../connection');

const findAllproducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findProductById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return product[0];
};

module.exports = {
  findAllproducts,
  findProductById,
};