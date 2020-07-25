/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import '../../utils/cache/injectCache';
import { User, UserController } from '.';

jest.mock('../../utils/cache/clearCache');
jest.mock('../../utils/cache/injectCache');
jest.mock('../../utils/logger');

describe('User component', () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    require('mongoose').Promise = global.Promise;
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('should insert a user into collection', async () => {
    const mockUser = new User({ firstName: 'Foo', lastName: 'Bar', participation: '20' });
    await mockUser.save();

    const insertedUser = await User.findOne({ firstName: 'Foo' });
    expect(insertedUser.firstName).toBe(mockUser.firstName);
  });

  it('should list saved users', async () => {
    const savedUsers = await User.find();
    expect(savedUsers.length).toBe(1);
  });

  it('should add a new user via controller', async () => {
    await UserController.addUser({
      firstName: 'John',
      lastName: 'Doe',
      participation: 5,
    });

    const insertedUser = await User.findOne({ firstName: 'John' });
    expect(insertedUser.firstName).toBe('John');
  });

  it('should throw an error when total participation is bigger than 100 on insert', async () => {
    await expect(async () => {
      await UserController.addUser({
        firstName: 'John',
        lastName: 'Doe',
        participation: 101,
      });
    }).rejects.toThrow('Total participation can\'t be bigger than 100');
  });

  it('should list user via controller', async () => {
    const users = await UserController.listUsers();
    expect(users).toHaveLength(2);
  });
});
