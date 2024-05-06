const salesService = require('../services/sale.services');

const findAllSales = async (request, response) => {
  console.log('oi');
  const sales = await salesService.findAllSales();
  response.json(sales);
};

const findSalesbyId = async (request, response) => {
  const { id } = request.params;
  const sale = await salesService.findSaleById(id);

  if (!sale || sale.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }
};

module.exports = { findAllSales, findSalesbyId };