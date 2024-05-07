const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/connection');
const productModel = require('../../../src/models/products.models');
const { product, products } = require('../mocks/product.mocks');

describe('testa camada model', function () {
  it('testa findAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.findAllproducts();

    expect(result).to.be.deep.equal(products);
  });

  it('testa findproductById', async function () {
    sinon.stub(connection, 'execute').resolves([product]);
    const result = await productModel.findProductById(1);

    expect(result.id).to.equal(1);
    expect(result.name).to.equal('Martelo de Thor');
    expect(result).to.be.an('object');
  });

  it('deve criar novos produtos', async function () {
    const nameProduct = 'martelo';
    const productId = 6;

    sinon.stub(connection, 'execute').resolves([{ productId }]);
    const result = await productModel.createProduct(nameProduct);

    expect(result).to.equal(productId);
  });
  afterEach(function () {
    sinon.restore();
  });
});
