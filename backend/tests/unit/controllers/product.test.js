const chai = require('chai');
const sinonchai = require('sinon-chai');
const sinon = require('sinon');
const app = require('../../../src/app');
const productServices = require('../../../src/services/products.services');

const { expect } = chai;
chai.use(sinonchai);

describe('testa a controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('ID invalido', async function () {
    sinon.stub(productServices, 'findProductById').resolves(null);
    const res = await chai.request(app)
      .get('/products/201');

    expect(res).to.have.status(404);
    expect(res.body.message).to.equal('Product not found');
  });

  it('deve criar um novo produto', async function () {
    const nameProduct = 'Martelo';
    const productId = 6;

    const request = { body: { name: nameProduct } };
    const expectedResponse = {
      id: productId,
      name: nameProduct,
    };
    sinon.stub(productServices, 'createProduct').resolves(productId);
    const response = await chai.request(app).post('/products').send(request.body);

    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal(expectedResponse);
  });
});