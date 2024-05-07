const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const connection = require('../../src/connection');
const app = require('../../src/app');
const { products } = require('./mocks/product.mocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('testa rota proucts', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves([products]);
  });
  afterEach(function () {
    connection.execute.restore();
  });
  it('deve retornar  products', async function () {
    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.be.deep.equal(products);
  });
});