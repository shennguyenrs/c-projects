import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { MONGO_URI } from './utils/config';
import * as carsApi from './controllers/carsApi';
import * as usersApi from './controllers/usersApi';

const app: express.Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connections
mongoose
  .connect(MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connects successfully');
  })
  .catch((err: Error) => {
    console.error('MongoDB fails to connect: ', err.message);
    process.exit(1);
  });

// CRUD Functions
// Cars API
app.get('/cars', usersApi.authenticate, carsApi.getAllCars);
app.get('/cars/:id', usersApi.authenticate, carsApi.getCarById);
app.post('/cars', usersApi.authenticate, carsApi.addNewCar);
app.delete('/cars/:id', usersApi.authenticate, carsApi.deleteCarById);
app.put('/cars/:id', usersApi.authenticate, carsApi.updateCarById);

// Users API
app.post('/users/login', usersApi.login);
app.post('/users/signup', usersApi.signup);

export default app;
