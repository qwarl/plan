const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminController {
    // [post] /admin/login
    async login(req, res) {
        const { phone, password } = req.body;
        console.log('hihihi: ', phone, password);

        try {
            const user = await User.findOne({ phone });
            if (!user) {
                return res.status(400).send({ error: 'Incorrect phone number or password' });
            }
            else {
                return res.status(200).send({ user });
            }
        } catch (error) {
            return res.status(400).send({ error: 'User not found' });
        }

    }

    // [post] /admin/getAll
    async getAll(req, res) {
        try {
            const admins = await Admin.find();
            res.status(200).send({ admins });
        } catch (error) {
            res.status(400).send({ error: 'Error' });
        }
    }
}

module.exports = new AdminController;
