import { model, Schema } from 'mongoose';
import User from '../interfaces/User';

// User database schema
const userSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Database mode
const userModel = model('userdb', userSchema);

export default userModel;
