import { Schema, model } from 'mongoose';
import { IUser } from './UserTypes';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  participation: {
    type: Number,
    required: true,
  },
});

export default model<IUser>('User', UserSchema);
