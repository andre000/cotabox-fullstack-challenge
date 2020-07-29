import { Store } from 'vuex'
import gql from 'graphql-tag'

export type IUser = {
  firstName: String,
  lastName: String,
  participation: Number
};

type IUserState = {
  users: Array<IUser>
}

export const state = () => ({
  users: []
})

export const mutations = {
  ADD_SINGLE_USER (store: IUserState, user: any) {
    store.users.push(user)
  },

  ADD_MULTIPLE_USERS (store: IUserState, user: any) {
    store.users = user
  }
}

export const actions = {
  async fetchUsers (store: Store<IUserState>) {
    const client = (this as any).app.apolloProvider.defaultClient
    const users = await client.query({
      query: gql`{
        listUsers {
          firstName
          lastName
          participation
        }
      }`
    })
    store.commit('ADD_MULTIPLE_USERS', users.data.listUsers)
  },

  async addUser (store: Store<IUserState>, user: IUser) {
    const client = (this as any).app.apolloProvider.defaultClient
    const newUser = await client.mutate({
      mutation: gql`mutation ($firstName: String!, $lastName: String! , $participation: Float!) {
        addUser(firstName: $firstName, lastName: $lastName, participation: $participation) {
          firstName
          lastName
          participation
        }
      }`,

      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        participation: user.participation
      }
    })

    store.commit('ADD_SINGLE_USER', newUser.data.addUser)
  }
}
