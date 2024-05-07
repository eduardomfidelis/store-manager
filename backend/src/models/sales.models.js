const connection = require('../connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    from sales_products AS sp
    join sales AS s
    on sp.sale_id = s.id`,
  );
  return sales;
};

const findSaleByID = async (id) => {
  const [sales] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s
    ON sp.sale_id = s.id
    where sp.sale_id = ?`,
    [id],
  );
  return sales;
};

const insertSaledate = async () => {
  const [{ insertId }] = await connection.execute(
    'insert into sales (date) values (?)',
    [new Date()],
  );
  return { insertId };
};

const insertSalesProducts = async (saleId, salesData) => {
  const promises = salesData.map(async (item) => {
    const { productId, quantity } = item;
    await connection
      .execute(
        'insert into sales_products (sale_id, product_id, quantity) values (?,?,?)',
        [saleId, productId, quantity],
      );
    return { productId, quantity };
  });
  return Promise.all(promises);
};

const createSale = async (salesData) => {
  const { insertId } = await insertSaledate();
  const salesProducts = await insertSalesProducts(insertId, salesData);
  return { id: insertId, itemsSold: salesProducts };
};
module.exports = { findAllSales, findSaleByID, createSale };
