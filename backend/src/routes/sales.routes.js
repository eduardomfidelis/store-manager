const { Router } = require('express');
const saleController = require('../controllers/sales.controllers');
const { 
  quantityValidation,
  productIdValidation,
  productValidation,
} = require('../middlewares/sales');

const salesRouter = Router();

salesRouter.get('/', saleController.findAllSales);
salesRouter.get('/:id', saleController.findSalesbyId);
salesRouter.post(
  '/',
  productIdValidation,
  productValidation,
  quantityValidation,
  saleController.createSale,
);

module.exports = salesRouter;