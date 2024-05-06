const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../src/app');
const connection = require('../src/connection');
const sales = require('./unit/mocks/sale.mocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('testa a rota sale', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves([sales]);
  });
  afterEach(function () {
    connection.execute.restore();
  });
  it('testa se a rota retorna as vendas', async function () {
    const result = await chai.request(app).get('/sales');

    expect(result).to.have.status(200);
    expect(result.body).to.be.deep.equal(sales);
  });
});