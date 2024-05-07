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
module.exports = { findAllSales, findSaleByID };
