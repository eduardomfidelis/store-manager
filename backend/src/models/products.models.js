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

const createProduct = async (name) => {
  const [result] = await connection.execute('insert into products (name) values (?)', [name]);
  return result.insertId;
};

module.exports = {
  findAllproducts,
  findProductById,
  createProduct,
};