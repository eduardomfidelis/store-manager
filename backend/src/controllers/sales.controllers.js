const salesService = require('../services/sale.services');

const findAllSales = async (request, response) => {
  const sales = await salesService.findAllSales();
  response.json(sales);
};

const findSalesbyId = async (request, response) => {
  const { id } = request.params;
  const sale = await salesService.findSaleById(id);

  if (!sale || sale.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }
  response.json(sale);
};

const createSale = async (request, response) => {
  const sale = request.body;
  const createdSale = await salesService.createSale(sale);

  response.status(201).json(createdSale);
};
module.exports = { findAllSales, findSalesbyId, createSale };