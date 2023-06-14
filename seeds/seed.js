const sequelize = require('../config/connection')
const { User, Comment, Post } = require('../models')

const userSeed = require('./userSeeds.json')
const postSeed = require('./postSeeds.json')
const commentSeed = require('./commentSeeds.json')

const seedDb = async() => {
    await sequelize.sync({ force: true })

    await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true
    })

    await Post.bulkCreate(postSeed)
    await Comment.bulkCreate(commentSeed)

    process.exit(0)
}

seedDb()