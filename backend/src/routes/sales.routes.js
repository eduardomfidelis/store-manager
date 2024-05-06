const { Router } = require('express');
const saleController = require('../controllers/sales.controllers');

const salesRouter = Router();

salesRouter.get('/', saleController.findAllSales);
salesRouter.get('/:id', saleController.findSalesbyId);

module.exports = salesRouter;