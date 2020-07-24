import { mergeSchemas } from 'apollo-server';
import { UserSchema, UserController, IUser } from '../components/Users';

export default mergeSchemas({
  schemas: [UserSchema],
  resolvers: {
    Query: {
      listUsers: () => UserController.listUsers(),
    },
    Mutation: {
      addUser: (root, args: IUser) => UserController.addUser(args),
    },
  },
});
