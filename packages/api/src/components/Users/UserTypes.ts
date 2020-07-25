import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string,
  lastName: string,
  participation: number,
}

export interface IUserInput {
  firstName: IUser['firstName'],
  lastName: IUser['lastName'],
  participation: IUser['participation'],
}
