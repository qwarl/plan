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
            }
            const hashedPassword = await argon2.hash(password)
            req.body.password = hashedPassword
            const newUser = new User(req.body)
            await newUser.save()

            // Return jsonwebtoken
            const accessToken = jwt.sign({ userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
                //line 26 dont work, replace by line 28
                // 'admin1'
            )

            res.status(200).json({ success: true, message: 'User created successfully', accessToken })

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
    //[post] users/login
    async login(req, res) {
        const { phone, password } = req.body
        // console.log('info: ', phone, password);
        console.log('info: ', req.body);
        try {
            //check exist user
            const user = await User.findOne({ phone })
            if (!user) {
                console.log('login fail, wrong phone number');
                return res.status(400).json({ success: false, message: 'phone number incorrect' })
            }
            // user found
            const isPasswordValid = await argon2.verify(user.password, password)
            if (!isPasswordValid) {
                console.log('login fail,password incorrect');
                return res.status(400).json({ success: false, message: 'password incorrect' })
            }
            // password  correct
            // Return jsonwebtoken
            const accessToken = jwt.sign({ userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
                //line 60 dont work, replace by line 62
                //ACCESS_TOKEN_SECRET='admin1'
                // 'admin1'
            )
            // res.status(200).json({ success: true, message: 'User logged in successfully' }, accessToken)
            res.status(200).json({ success: true, message: 'User logged in successfully', accessToken })
            console.log('login success');
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })

        }
    }

    // [get] /users/getAll
    async getAll(req, res) {
        // const { userId } = req.user
        // console.log();
        try {
            const users = await User.find({});
            // console.log('users: ', users);
            res.status(200).json({ success: true, message: 'Get all users successfully', users });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error' });
        }
    }
    //[post] /users/remove
    removeUser(req, res) {
        const { idUser } = req.params
        console.log('idUser: ', idUser);
        User.findByIdAndRemove(idUser, (err, user) => {
            if (err) {
                res.status(400).json({ success: false, message: 'Error' })
            }
            res.status(200).json({ success: true, message: 'User deleted successfully' })
        })
    }
    // [post] /users/update
    updateUser(req, res) {
        const idUser  = req.params
        console.log('idUser: ', idUser);
        User.findByIdAndUpdate(idUser, req.body, (err, user) => {
            if (err) {
                res.status(400).json({ success: false, message: 'Error' })
            }
            res.status(200).json({ success: true, message: 'User updated successfully' })
        })
    }
}

module.exports = new UsersController;