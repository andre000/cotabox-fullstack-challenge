import { ApolloError } from 'apollo-server';
import { User } from '.';
import { IUser, IUserInput } from './UserTypes';
import { clearCache } from '../../utils';

export default {
  async addUser(user: IUserInput): Promise<IUser> {
    const isValidParticipation = await this.checkParticipation(user.participation);
    if (!isValidParticipation) throw new ApolloError('Total participation can\'t be bigger than 100', 'VALIDATION_ERROR');

    const newUser = new User(user);

    await clearCache();
    return newUser.save();
  },

  async listUsers(): Promise<IUser[]> {
    return User.find({}).cache();
  },

  async checkParticipation(newParticipation: number): Promise<boolean> {
    const allUsers = await User.find();
    const totalParticipation = allUsers.reduce((t, d) => (t + d.participation), 0);

    return newParticipation + totalParticipation <= 100;
  },
};
