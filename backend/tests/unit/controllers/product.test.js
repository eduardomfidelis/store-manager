const chai = require('chai');
// const sinonchai = require('sinon-chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const productServices = require('../../../src/services/products.services');

const { expect } = chai;
chai.use(chaiHttp);

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

  it('deve retornar 400 se o nome não for passado', async function () {
    const request = { body: { } };
    const response = await chai.request(app).post('/products').send(request.body);

    expect(response).to.have.status(400);
    expect(response.body.message).to.equal('"name" is required');
  });

  it('deve retornar 422 se 0 nome for menor que 5 caracteres', async function () {
    const request = { body: { name: 'bala' } };
    const response = await chai.request(app).post('/products').send(request.body);

    expect(response).to.have.status(422);
    expect(response.body.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('deve apagar um produto', async function () {
    const deletingProd = 1;

    productServices.findProductById = async () => ({ id: deletingProd });

    const result = await chai.request(app).delete(`/products/${deletingProd}`);
    expect(result).to.have.status(404);
  });
});