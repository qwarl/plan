const User = require('../models/User')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

class UsersController {
    //[post] /users/register
    async register(req, res) {
        const { phone, password } = req.body
        console.log('hohoho: ', phone, password)
        console.log('hahahah: ', req.body);

        try {
            // check exist user
            const user = await User.findOne({ phone })
            if (user) {
                return res.status(400).json({ success: false, message: 'User already exists' })

                const hashedPassword = await argon2.hash(password)
                req.body.password = hashedPassword
                const newUser = new User(req.body)
                await newUser.save()

                //Return jsonwebtoken
                const accessToken = jwt.sign({ userId: newUser._id },
                    process.env.ACCESS_TOKEN_SECRET
                )

                res.json({ success: true, message: 'User created successfully', accessToken })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })

        }
    }
}
//[post] /users/login

module.exports = new UsersController;