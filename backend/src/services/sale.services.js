const saleModels = require('../models/sales.models');

const findAllSales = async () => saleModels.findAllSales();
const findSaleById = async (id) => saleModels.findSaleById(id);

module.exports = { findAllSales, findSaleById };