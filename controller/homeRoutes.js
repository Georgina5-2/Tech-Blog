const router = require('express').Router()
const { Comment, User, Post } = require('../models')
const withAuth = require('../utils/auth')

// Get all posts and print in homepage
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [ { model: User, attributes: ['username'] }]
        })
        const posts = allPosts.map((post) => post.get({ plain: true }))
        console.log(posts)
        res.render('homepage', { posts, loggedIn: req.session.loggedIn })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get post by id and print in post page
router.get('/post/:id', async (req, res) => {
    try {
        const postById = await Post.findByPk(req.params.id, {
            include: [{ 
                model: User, 
                attributes: ['username'] }, { 
                model: Comment, include: [{ model: User, attributes: ['username'] }] 
                },
            ] 
        })
        const post = postById.get({ plain: true })
        console.log(post)
        res.render('post', { post, loggedIn: req.session.loggedIn })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
})

// Signup route
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
         return
    }
    res.render('signup')
})

// Dashboard: GET logged-in user posts
router.get('/dashboard', withAuth, async (req, res) => {
    try { 
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        })
        const user = userData.get({ plain: true })

        res.render('dashboard', { ...user, loggedIn: true })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Render new post page
router.get('/new-post', withAuth, async (req,res) => {
    res.render('new-post')
})

// Render edit/delete current user's posts
router.get('/edit/:id', withAuth, async (req,res) => {
        try {
            const postData = await Post.findByPk(req.params.id)
            const post = postData.get({ plain: true })
            console.log(post)
            res.render('edit-post', { post })
        } catch (err) {
            res.status(500).json(err)
        }
})

module.exports = router;