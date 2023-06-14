const router = require('express').Router()
const { User } = require('../../models')

// Sign up
router.post('/', async(req, res) => {
    try {
        const newUser = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = newUser.id
            req.session.loggedIn = true
            
            res.status(200).json(newUser)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }})
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Username not found, please try again '})
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' })
            return
        }
      
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.loggedIn = true

            res.json({ user: userData, message: 'You are now logged in!' })
        })

    } catch (err) {
        res.status(400).json(err)
    }
})

// Log Out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(()=> {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router