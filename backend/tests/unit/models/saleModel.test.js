const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.models');
const mocksSales = require('../mocks/sale.mocks');
const connection = require('../../../src/connection');

describe('testa a model', function () {
  it('testa se findAllSales retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await salesModel.findAllSales();

    expect(result).to.be.an('array');
  });

  it('testa se retorna um objeto com id passado', async function () {
    sinon.stub(connection, 'execute').resolves(mocksSales.sales);
    const result = await salesModel.findSaleByID(1);

    expect(result).to.be.an('object');
    expect(result.productId).to.equal(1);
    expect(result.quantity).to.equal(2);
    expect(result.date).to.equal('2021-09-09T04:54:29.000Z');
  });
  it('deve retornar sales com a data correta', async function () {
    const productDetail = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ];
    const itemSold = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 4 },
    ];
    const insertId = 1;

    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    const result = await salesModel.createSale(productDetail);
    expect(result).to.be.deep.equal({ id: insertId, item: itemSold });
  });
  afterEach(function () {
    sinon.restore();
  });
});