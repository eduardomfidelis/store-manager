const saleModels = require('../models/sales.models');

const findAllSales = async () => saleModels.findAllSales();
const findSaleById = async (id) => saleModels.findSaleByID(id);

module.exports = { findAllSales, findSaleById };