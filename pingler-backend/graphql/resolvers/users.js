// Imports Model
import Users from '../../models/User.js'

const usersResolver = {
    Mutation: {

        /**
         * 
         * @param {*} _ Parent resolvers
         * @param {*} args Argument from register mutation
         * @param {*} context 
         * @param {*} info General info from meta data
         */

        register (_, args, context, info) {
            // TODO: Validate user data
            // TODO: Make sure user does not already exists
            // TODO: hash password and create an auth token
        }
    }
}

export default usersResolver;