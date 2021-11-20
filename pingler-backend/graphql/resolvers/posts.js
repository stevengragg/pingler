// Imports Model
import Posts from '../../models/Post.js'

const postsResolver = {
    Query: {

        /**
         * 
         * @returns {Object} Posts fetched object
         */
        async getPosts() {
            try {
                return await Posts.find();
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default postsResolver;