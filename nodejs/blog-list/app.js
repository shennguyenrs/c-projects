const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();

const { MONGODB_URI } = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const middleWare = require('./utils/middleware');

logger.info('Connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => logger.info('Connected successfully!'))
  .catch((err) => {
    logger.error('Error to connect MongoDB', err.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
// app.use(express.static('./build'));
app.use(middleWare.requestLogger);

app.use('/api/blog', blogRouter);

app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);

module.exports = app;
