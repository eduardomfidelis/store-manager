const chai = require('chai');
const sinon = require('sinon');
const sinonchai = require('sinon-chai');
const productService = require('../../../src/services/products.services');
const {
  productIdValidation,
  productValidation,
  quantityValidation,
} = require('../../../src/middlewares/sales');

const { expect } = chai;
chai.use(sinonchai);

describe('teste para middleware', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('valida productID', async function () {
    const request = { body: [{ quantity: 1 }] };
    const response = { status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await productIdValidation(request, response);
    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });

  it('testa quantity middleware', async function () {
    const request = { body: [{ productId: 1 }] };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await quantityValidation(request, response);
    expect(response.status).to.have.been.calledWith(400);
    expect(response.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });

  it('testa se quantidade e maior que 1', async function () {
    const request = { body: [{ productId: 1, quantity: 0 }] };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    await quantityValidation(request, response);
    expect(response.status).to.have.been.calledWith(422);
    expect(response.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });
  
  it('testa productID', async function () {
    const request = { body: [{ productId: 100, quantity: 1 }] };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    sinon.stub(productService, 'findProductById').resolves(null);
    await productValidation(request, response);
    expect(response.status).to.have.been.calledWith(404);
    expect(response.json).to.have.been.calledWith({
      message: '"product" not found',
    });
  });
  sinon.restore();
});
