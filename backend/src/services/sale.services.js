const saleModels = require('../models/sales.models');

const findAllSales = async () => saleModels.findAllSales();
const findSaleById = async (id) => saleModels.findSaleByID(id);
const createSale = async (sale) => saleModels.createSale(sale);
module.exports = { findAllSales, findSaleById, createSale };