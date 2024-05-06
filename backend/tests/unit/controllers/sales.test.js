const chai = require('chai');
const sinonchai = require('sinon-chai');
const app = require('../../../src/app');
const saleService = require('../../../src/services/sale.services');

const { expect } = chai;
chai.use(sinonchai);

describe('testa a controller', function () {
  it('ID invalido', async function () {
    saleService.findSaleById = async () => null;
    const res = await chai.request(app)
      .get('/sales/201');

    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Sale not found');
  });
});