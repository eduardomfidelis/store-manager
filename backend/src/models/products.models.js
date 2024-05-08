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

const deleteProducts = async (id) => {
  await connection.execute('delete from products where id = ?', [id]);
  return id;
};
module.exports = {
  findAllproducts,
  findProductById,
  createProduct,
  deleteProducts,
};