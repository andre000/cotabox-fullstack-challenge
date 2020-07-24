import { User } from '.';
import { IUser } from './UserTypes';
import { clearCache } from '../../utils';

export default {
  async addUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    await clearCache();
    return newUser.save();
  },

  async listUsers(): Promise<IUser[]> {
    return User.find({}).cache();
  },
};
