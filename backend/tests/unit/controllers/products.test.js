const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const connection = require('../../../src/connection');
const { products } = require('../mocks/product.mocks');
const productServices = require('../../../src/services/products.services');

chai.use(chaiHttp);
const { expect } = chai;

describe('testa a camada controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('testa controler', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const response = await chai.request(app).get('/products');

    expect(response).to.have.status(200);
  });
  it('ID invalido', async function () {
    productServices.findSaleById = async () => null;
    const res = await chai.request(app)
      .get('/product/201');

    expect(res).to.have.status(404);
  });
});
