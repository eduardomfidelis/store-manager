const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.models');
const productServices = require('../../../src/services/products.services');
const { product } = require('../mocks/product.mocks');
const connection = require('../../../src/connection');

describe('teste a service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('testa findAllProducts', async function () {
    sinon.stub(productModel, 'findAllproducts').resolves([]);
    const result = await productServices.findAllproducts();

    expect(result).to.be.deep.equal([]);
  });

  it('testa findProducts', async function () {
    sinon.stub(connection, 'execute').resolves([product]);
    const result = await productServices.findProductById(1);

    expect(result.id).to.equal(1);
    expect(result.name).to.equal('Martelo de Thor');
  });
});
