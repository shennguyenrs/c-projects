import mongoose from 'mongoose';

import Car from '../interfaces/Car';

// Database schema
const carSchema = new mongoose.Schema<Car>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  year: { type: Number, required: true },
});

// Database model
const carModel = mongoose.model('cardb', carSchema);

export default carModel;
