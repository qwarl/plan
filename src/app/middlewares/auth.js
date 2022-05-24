const jwt = require('jsonwebtoken');
const { login } = require('../controllers/UsersController');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' })
    }
    try {
        const decoded = jwt.verify(token, 'admin1')
        req.userId=decoded.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Token is invalid' })
    }
}

module.exports = verifyToken