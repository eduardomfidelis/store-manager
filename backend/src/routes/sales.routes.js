const { Router } = require('express');
const saleController = require('../controllers/sales.controllers');

const salesRouter = Router();

salesRouter.get('/', saleController.findAllSales);
salesRouter.get('/:id', saleController.findSalesbyId);
salesRouter.post('/', saleController.createSale);

module.exports = salesRouter;