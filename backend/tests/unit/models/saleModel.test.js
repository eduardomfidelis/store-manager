const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const salesModel = require('../../../src/models/sales.models');
//const mocksSales = require('../mocks/sales.mocks');
const connection = require('../../../src/connection');

describe('testa a model', function () {
  it('testa se findAllSales retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const result = await salesModel.findAllSales();

    expect(result).to.be.an('array');
  });
});