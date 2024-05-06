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
  afterEach(function () {
    sinon.restore();
  });
});