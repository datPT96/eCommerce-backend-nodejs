const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');

const app = express();

//init middlewares
app.use(morgan('dev'));
// morgan('combined')
// morgan('common')
// morgan('short')
// morgan('tiny')
app.use(helmet());
app.use(compression());

//init db

//init router
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome Server!',
  });
});

//handle error

module.exports = app;
