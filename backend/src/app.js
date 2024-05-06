const express = require('express');
const route = require('./routes/products.routes');
const salesRouter = require('./routes/sales.routes');

const app = express();

app.use(express.json());
app.use('/products', route);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
