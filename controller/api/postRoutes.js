const router = require('express').Router()
const { Post } = require('../../models')
const withAuth = require('../../utils/auth')

// Create new post
router.post('/', withAuth, async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postToUpdate = await Post.update(
        {
            title: req.body.title, 
            content: req.body.content
        }, 
        {
            where: {
                id: req.params.id
            }
       })
       res.status(200).json(postToUpdate)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postToDelete = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        console.log(postToDelete, 'id', req.params.id)
        
        if(!postToDelete) {
            res.status(404).json({ message: 'No post found' })
            console.log('not found')
            return
        }

        res.status(200).json(postToDelete)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router